/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, Plus, Search, Trash2 } from 'lucide-react';

import { EmptyState, Input } from '@shared/components/common';
import { formatDateShort } from '@shared/utils';

import type { PerformanceFormData, TimetableSlot } from '../types';

import * as styles from './timetable-tab.css';

interface TimetableTabProps {
  formData: PerformanceFormData;
  daysArray: string[];
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  sensors: ReturnType<typeof import('@dnd-kit/core').useSensors>;
  activeId: string | number | null;
  activeType: 'artist' | 'timeslot' | null;
  handleDragStart: (event: import('@dnd-kit/core').DragStartEvent) => void;
  handleDragOver: (event: import('@dnd-kit/core').DragOverEvent) => void;
  handleDragEnd: (event: import('@dnd-kit/core').DragEndEvent) => void;
  handleOpenTimeslotModal: (slot: TimetableSlot) => void;
  handleOpenCollabModal: () => void;
  handleFestivalDateOpenAtChange: (date: string, openAt: string) => void;
}

export const TimetableTab = ({
  formData,
  daysArray,
  selectedDay,
  setSelectedDay,
  sensors,
  activeId,
  activeType,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleOpenTimeslotModal,
  handleOpenCollabModal,
  handleFestivalDateOpenAtChange,
}: TimetableTabProps) => {
  const [timetableArtistSearch, setTimetableArtistSearch] = useState('');
  const selectedFestivalDateMeta = formData.festivalDateMetas.find(
    (festivalDateMeta) => festivalDateMeta.date === selectedDay,
  );

  // 타임테이블에 배정되지 않은 아티스트 목록
  const assignedArtistIds = new Set(
    formData.timetableSlots
      .filter((slot) => slot.date === selectedDay)
      .map((slot) => slot.artistId),
  );
  const lineupArtistsForSelectedDay = formData.artists.filter(
    (artist) => artist.festivalDates?.includes(selectedDay) ?? true,
  );
  const unassignedArtists = lineupArtistsForSelectedDay.filter(
    (artist) => !assignedArtistIds.has(artist.id),
  );

  // 타임테이블 아티스트 검색 필터링
  const filteredTimetableArtists = unassignedArtists.filter((artist) =>
    artist.name.toLowerCase().includes(timetableArtistSearch.toLowerCase()),
  );

  // 드래그 가능한 아티스트 아이템
  interface DraggableArtistItemProps {
    artist: { id: number; name: string };
  }

  const DraggableArtistItem = ({ artist }: DraggableArtistItemProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: artist.id,
    });

    const style = {
      opacity: isDragging ? 0.3 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={styles.timetableArtistItem}
      >
        <div className={styles.artistAvatar}>
          {artist.name.charAt(0).toUpperCase()}
        </div>
        <span className={styles.artistName}>{artist.name}</span>
      </div>
    );
  };

  // 드롭 가능한 아티스트 패널
  const DroppableArtistPanel = () => {
    const { setNodeRef, isOver } = useDroppable({
      id: 'artist-panel',
    });

    return (
      <div
        ref={setNodeRef}
        className={styles.timetableArtistPanel}
        style={{
          backgroundColor: isOver ? '#FEE2E2' : undefined,
        }}
      >
        <div className={styles.timetableArtistPanelHeader}>
          {/* Search Box */}
          <div className={styles.timetableArtistSearchBox}>
            <Search size={14} className={styles.timetableSearchIcon} />
            <input
              type="text"
              value={timetableArtistSearch}
              onChange={(e) => setTimetableArtistSearch(e.target.value)}
              placeholder="목록에서 찾기..."
              className={styles.timetableArtistSearchInput}
            />
          </div>
          {/* Add Unregistered Button */}
          <button
            onClick={handleOpenCollabModal}
            className={styles.addUnregisteredButton}
          >
            <Plus size={14} />
            미등록 아티스트 직접 등록
          </button>
        </div>

        {/* Artist List */}
        <div className={styles.timetableArtistList}>
          {isOver && (
            <div className={styles.deleteDropZone}>
              <Trash2 size={24} />
              <p>여기에 놓으면 삭제됩니다</p>
            </div>
          )}
          {filteredTimetableArtists.length > 0 ? (
            filteredTimetableArtists.map((artist) => (
              <DraggableArtistItem key={artist.id} artist={artist} />
            ))
          ) : (
            <EmptyState title="미배정 아티스트가 없습니다." />
          )}
        </div>
      </div>
    );
  };

  // Sortable 타임슬롯
  interface SortableTimeslotProps {
    slot: TimetableSlot;
  }

  const SortableTimeslot = ({ slot }: SortableTimeslotProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: slot.id,
    });

    const artist = formData.artists.find((a) => a.id === slot.artistId);

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.3 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={styles.timeslotBox}
        onClick={(e) => {
          e.stopPropagation();
          handleOpenTimeslotModal(slot);
        }}
      >
        <div className={styles.timeslotTime}>
          <Clock size={10} />
          <span className={styles.timeslotTimeText}>
            {slot.startTime} - {slot.endTime}
          </span>
        </div>
        <div className={styles.timeslotArtistName}>
          {artist?.name || '알 수 없음'}
        </div>
      </div>
    );
  };

  // 드롭 가능한 스테이지 컬럼
  interface DroppableStageColumnProps {
    stageIndex: number;
    stage: { name: string };
    slots: TimetableSlot[];
  }

  const DroppableStageColumn = ({
    stageIndex,
    stage,
    slots,
  }: DroppableStageColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
      id: `stage-${stageIndex}`,
    });

    const slotIds = slots.map((slot) => slot.id);

    return (
      <div className={styles.stageColumn}>
        {/* Stage Header */}
        <div className={styles.stageColumnHeader}>
          <div className={styles.stageColumnTitle}>
            {stage.name || `Stage ${stageIndex + 1}`}
          </div>
          <div className={styles.stageColumnCount}>{slots.length} acts</div>
        </div>

        {/* Stage Content */}
        <SortableContext items={slotIds} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className={styles.stageColumnContent}>
            {slots.map((slot) => (
              <SortableTimeslot key={slot.id} slot={slot} />
            ))}

            {/* Drop Zone */}
            <div
              className={styles.timeslotDropZone}
              style={{
                borderColor: isOver ? '#3B82F6' : undefined,
                backgroundColor: isOver ? '#EFF6FF' : undefined,
              }}
            >
              <p className={styles.timeslotDropZoneText}>
                여기로 드래그하여 추가
              </p>
              <button className={styles.timeslotDropZoneAction}>
                <Plus size={12} />
                수동 추가
              </button>
            </div>
          </div>
        </SortableContext>
      </div>
    );
  };

  return (
    <div className={styles.timetableWrapper}>
      {/* Header: Day Buttons + Unassigned Count */}
      <div className={styles.timetableHeader}>
        <div className={styles.dayButtonGroup}>
          {daysArray.length > 0 ? (
            <div className={styles.dayButtons}>
              {daysArray.map((date, index) => (
                <button
                  key={date}
                  onClick={() => setSelectedDay(date)}
                  className={
                    selectedDay === date
                      ? styles.dayButtonActive
                      : styles.dayButton
                  }
                >
                  Day {index + 1} ({formatDateShort(date)})
                </button>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '1.4rem', color: '#6A7282' }}>
              시작일과 종료일을 입력하세요
            </p>
          )}
          {daysArray.length > 0 && (
            <div className={styles.unassignedBadge}>
              <span className={styles.unassignedCount}>
                {unassignedArtists.length}팀
              </span>{' '}
              미배정
            </div>
          )}
        </div>
        {selectedDay && (
          <div className={styles.ticketOpenAtPanel}>
            <div className={styles.ticketOpenAtMeta}>
              <span className={styles.ticketOpenAtTitle}>티켓 오픈 시간</span>
              <span className={styles.ticketOpenAtDate}>
                {formatDateShort(selectedDay)} 기준
              </span>
            </div>
            <div className={styles.ticketOpenAtField}>
              <Input
                type="time"
                value={selectedFestivalDateMeta?.openAt ?? ''}
                onChange={(e) =>
                  handleFestivalDateOpenAtChange(selectedDay, e.target.value)
                }
              />
              <p className={styles.ticketOpenAtHint}>
                비워두면 첫 공연 시작 시간으로 자동 저장돼요.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Body: Artist Panel + Stage Grid */}
      {daysArray.length > 0 && (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.timetableBody}>
            {/* Left: Artist Panel */}
            <DroppableArtistPanel />

            {/* Right: Stage Grid */}
            <div className={styles.timetableStageGrid}>
              {formData.stages.length > 0 ? (
                formData.stages.map((stage, stageIndex) => {
                  // 해당 날짜와 스테이지에 할당된 타임슬롯들
                  const slotsForStage = formData.timetableSlots.filter(
                    (slot) =>
                      slot.date === selectedDay &&
                      slot.stageIndex === stageIndex,
                  );

                  return (
                    <DroppableStageColumn
                      key={stageIndex}
                      stageIndex={stageIndex}
                      stage={stage}
                      slots={slotsForStage}
                    />
                  );
                })
              ) : (
                <EmptyState title="스테이지를 먼저 추가해주세요." />
              )}
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId &&
              activeType === 'artist' &&
              (() => {
                const artist = formData.artists.find((a) => a.id === activeId);
                return artist ? (
                  <div className={styles.dragOverlayItem}>
                    <div className={styles.artistAvatar}>
                      {artist.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={styles.artistName}>{artist.name}</span>
                  </div>
                ) : null;
              })()}
            {activeId &&
              activeType === 'timeslot' &&
              (() => {
                const slot = formData.timetableSlots.find(
                  (s) => s.id === activeId,
                );
                const artist = slot
                  ? formData.artists.find((a) => a.id === slot.artistId)
                  : null;
                return slot ? (
                  <div className={styles.dragOverlayTimeslot}>
                    <div className={styles.timeslotTime}>
                      <Clock size={10} />
                      <span className={styles.timeslotTimeText}>
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                    <div className={styles.timeslotArtistName}>
                      {artist?.name || '알 수 없음'}
                    </div>
                  </div>
                ) : null;
              })()}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};
