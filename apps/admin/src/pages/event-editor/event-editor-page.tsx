import { useState } from 'react';
import { Calendar, FileText, Image, Trash2, Users, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Input, Select } from '@shared/components/common';
import { PATH } from '@shared/constants';
import { PENDING_ITEMS } from '@shared/mocks';
import { fileToBase64, generateDateRange } from '@shared/utils';

import { BasicInfoTab } from './components/basic-info-tab';
import { DetailInfoTab } from './components/detail-info-tab';
import { LineupTab } from './components/lineup-tab';
import { TimetableTab } from './components/timetable-tab';
import { useAgencyManagement } from './hooks/use-agency-management';
import { useArtistManagement } from './hooks/use-artist-management';
import { useBookingSchedule } from './hooks/use-booking-schedule';
import { useEventForm } from './hooks/use-event-form';
import { useModals } from './hooks/use-modals';
import { usePriceGrades } from './hooks/use-price-grades';
import { useStageManagement } from './hooks/use-stage-management';
import { useTimetableDnd } from './hooks/use-timetable-dnd';
import type { ExistingEvent } from './types';

import * as styles from './event-editor-page.css';

type TabKey = 'basic' | 'detail' | 'lineup' | 'timetable';

const EventEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const existingEvent: ExistingEvent | null = isNew
    ? null
    : PENDING_ITEMS.find((item) => item.id === Number(id)) || null;

  const [activeTab, setActiveTab] = useState<TabKey>('basic');
  const [selectedDay, setSelectedDay] = useState<string>('');

  // Custom hooks
  const { formData, setFormData, handleInputChange } = useEventForm({
    existingEvent,
  });

  const {
    handleAddBookingSchedule,
    handleRemoveBookingSchedule,
    handleBookingScheduleChange,
  } = useBookingSchedule({ formData, setFormData });

  const { handleToggleAgency, handleRemoveAgency, handleAgencyChange } =
    useAgencyManagement({ formData, setFormData });

  const {
    handleAddPriceGrade,
    handleRemovePriceGrade,
    handlePriceGradeChange,
  } = usePriceGrades({ formData, setFormData });

  const { handleAddStage, handleRemoveStage, handleStageChange } =
    useStageManagement({ formData, setFormData });

  const {
    showArtistDropdown,
    setShowArtistDropdown,
    handleAddArtist,
    handleAddCustomArtist,
    handleRemoveArtist,
    handleArtistSearchChange,
  } = useArtistManagement({ formData, setFormData });

  const {
    sensors,
    activeId,
    activeType,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useTimetableDnd({ formData, setFormData, selectedDay });

  const {
    showTimeslotModal,
    editingSlot,
    setEditingSlot,
    handleOpenTimeslotModal,
    handleCloseTimeslotModal,
    handleUpdateTimeslot,
    handleDeleteTimeslot,
    showCollabModal,
    collabArtistName,
    setCollabArtistName,
    handleOpenCollabModal,
    handleCloseCollabModal,
    handleAddCollabArtist,
    scheduleSynced,
    handleSyncSchedule,
  } = useModals({ formData, setFormData });

  // 날짜 배열 생성 (startDate ~ endDate)
  const daysArray = generateDateRange(formData.startDate, formData.endDate);

  // 첫 번째 날짜를 선택된 날짜로 설정
  if (daysArray.length > 0 && !selectedDay) {
    setSelectedDay(daysArray[0]);
  }

  const handleFileChange = async (
    field: 'mainPoster' | 'logo',
    file: File | null,
  ) => {
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormData((prev) => ({
          ...prev,
          [field]: file,
          [`${field}Preview`]: base64,
        }));
      } catch {
        alert('파일 업로드에 실패했습니다.');
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: null,
        [`${field}Preview`]: null,
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    navigate(PATH.PENDING);
  };

  const handleDelete = () => {
    console.log('Deleting event');
    navigate(PATH.PENDING);
  };

  const handleClose = () => {
    navigate(PATH.PENDING);
  };

  const tabs = [
    { key: 'basic' as TabKey, label: '기본 정보', icon: FileText },
    { key: 'detail' as TabKey, label: '상세 정보 & 미디어', icon: Image },
    { key: 'lineup' as TabKey, label: '라인업 & 스테이지', icon: Users },
    { key: 'timetable' as TabKey, label: '타임테이블', icon: Calendar },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentCard}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <button onClick={handleClose} className={styles.closeButton}>
            <X size={20} />
          </button>
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>새 공연 등록</h1>
          </div>
          <div className={styles.headerActions}>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <Trash2 size={16} />
              삭제
            </button>
            <button onClick={handleSubmit} className={styles.saveButton}>
              저장 및 계속
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={
                  activeTab === tab.key ? styles.tabActive : styles.tab
                }
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === 'basic' && (
            <BasicInfoTab
              formData={formData}
              handleInputChange={handleInputChange}
              handleAddBookingSchedule={handleAddBookingSchedule}
              handleRemoveBookingSchedule={handleRemoveBookingSchedule}
              handleBookingScheduleChange={handleBookingScheduleChange}
              handleToggleAgency={handleToggleAgency}
              handleRemoveAgency={handleRemoveAgency}
              handleAgencyChange={handleAgencyChange}
              scheduleSynced={scheduleSynced}
              handleSyncSchedule={handleSyncSchedule}
            />
          )}
          {activeTab === 'detail' && (
            <DetailInfoTab
              formData={formData}
              handleInputChange={handleInputChange}
              handleAddPriceGrade={handleAddPriceGrade}
              handleRemovePriceGrade={handleRemovePriceGrade}
              handlePriceGradeChange={handlePriceGradeChange}
              handleFileChange={handleFileChange}
            />
          )}
          {activeTab === 'lineup' && (
            <LineupTab
              formData={formData}
              handleAddStage={handleAddStage}
              handleRemoveStage={handleRemoveStage}
              handleStageChange={handleStageChange}
              showArtistDropdown={showArtistDropdown}
              setShowArtistDropdown={setShowArtistDropdown}
              handleAddArtist={handleAddArtist}
              handleAddCustomArtist={handleAddCustomArtist}
              handleRemoveArtist={handleRemoveArtist}
              handleArtistSearchChange={handleArtistSearchChange}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'timetable' && (
            <TimetableTab
              formData={formData}
              daysArray={daysArray}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              sensors={sensors}
              activeId={activeId}
              activeType={activeType}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragEnd={handleDragEnd}
              handleOpenTimeslotModal={handleOpenTimeslotModal}
              handleOpenCollabModal={handleOpenCollabModal}
            />
          )}
        </div>
      </div>

      {/* Timeslot Edit Modal */}
      {showTimeslotModal && editingSlot && (
        <div className={styles.modalOverlay} onClick={handleCloseTimeslotModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>타임슬롯 수정</h2>
              <button
                onClick={handleCloseTimeslotModal}
                className={styles.modalCloseButton}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalContent}>
              {/* Time Selection */}
              <div className={styles.timeRow}>
                <Input
                  label="시작 시간"
                  type="time"
                  value={editingSlot.startTime}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      startTime: e.target.value,
                    })
                  }
                />
                <Input
                  label="종료 시간"
                  type="time"
                  value={editingSlot.endTime}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>

              {/* Artist Selection */}
              <Select
                label="아티스트"
                value={editingSlot.artistId}
                onChange={(e) =>
                  setEditingSlot({
                    ...editingSlot,
                    artistId: Number(e.target.value),
                  })
                }
              >
                {formData.artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </Select>

              {/* Stage Selection */}
              <Select
                label="스테이지"
                value={editingSlot.stageIndex}
                onChange={(e) =>
                  setEditingSlot({
                    ...editingSlot,
                    stageIndex: Number(e.target.value),
                  })
                }
              >
                {formData.stages.map((stage, index) => (
                  <option key={index} value={index}>
                    {stage.name || `Stage ${index + 1}`}
                  </option>
                ))}
              </Select>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={handleDeleteTimeslot}
                className={styles.modalDeleteButton}
              >
                삭제
              </button>
              <button
                onClick={handleCloseTimeslotModal}
                className={styles.modalCancelButton}
              >
                취소
              </button>
              <button
                onClick={handleUpdateTimeslot}
                className={styles.modalSaveButton}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collab Artist Modal */}
      {showCollabModal && (
        <div className={styles.modalOverlay} onClick={handleCloseCollabModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>콜라보 아티스트 등록</h2>
              <button
                onClick={handleCloseCollabModal}
                className={styles.modalCloseButton}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalContent}>
              <Input
                label="아티스트 이름"
                type="text"
                value={collabArtistName}
                onChange={(e) => setCollabArtistName(e.target.value)}
                placeholder="예: 아이유 x 태연"
                autoFocus
              />
              <p
                style={{
                  fontSize: '1.3rem',
                  color: '#6A7282',
                  marginTop: '-0.8rem',
                }}
              >
                여러 아티스트가 함께 공연하는 경우 사용하세요
              </p>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={handleCloseCollabModal}
                className={styles.modalCancelButton}
              >
                취소
              </button>
              <button
                onClick={handleAddCollabArtist}
                className={styles.modalSaveButton}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventEditorPage;
