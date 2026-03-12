import { Dispatch, SetStateAction, useState } from 'react';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import type { PerformanceFormData, TimetableSlot } from '../types';

interface UseTimetableDndProps {
  formData: PerformanceFormData;
  setFormData: Dispatch<SetStateAction<PerformanceFormData>>;
  selectedDay: string;
}

export const useTimetableDnd = ({
  formData,
  setFormData,
  selectedDay,
}: UseTimetableDndProps) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [activeType, setActiveType] = useState<'artist' | 'timeslot' | null>(
    null,
  );

  // 드래그 센서 설정 - 5px 이상 이동해야 드래그로 인식
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const idStr = String(active.id);

    if (idStr.startsWith('slot-')) {
      setActiveType('timeslot');
    } else {
      setActiveType('artist');
    }
    setActiveId(active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    // 타임슬롯끼리 드래그 (순서 변경 또는 스테이지 이동)
    if (activeIdStr.startsWith('slot-') && overIdStr.startsWith('slot-')) {
      const activeSlot = formData.timetableSlots.find(
        (s) => s.id === activeIdStr,
      );
      const overSlot = formData.timetableSlots.find((s) => s.id === overIdStr);

      if (activeSlot && overSlot) {
        // 같은 스테이지 내에서 순서 변경
        if (
          activeSlot.stageIndex === overSlot.stageIndex &&
          activeSlot.date === overSlot.date
        ) {
          const allSlots = [...formData.timetableSlots];
          const activeIndex = allSlots.findIndex((s) => s.id === activeIdStr);
          const overIndex = allSlots.findIndex((s) => s.id === overIdStr);

          if (
            activeIndex !== -1 &&
            overIndex !== -1 &&
            activeIndex !== overIndex
          ) {
            const moved = arrayMove(allSlots, activeIndex, overIndex);
            setFormData((prev) => ({
              ...prev,
              timetableSlots: moved,
            }));
          }
        }
        // 다른 스테이지로 이동
        else {
          const allSlots = [...formData.timetableSlots];
          const activeIndex = allSlots.findIndex((s) => s.id === activeIdStr);
          const overIndex = allSlots.findIndex((s) => s.id === overIdStr);

          if (activeIndex !== -1 && overIndex !== -1) {
            // active 슬롯의 stageIndex를 over 슬롯의 stageIndex로 변경
            allSlots[activeIndex] = {
              ...allSlots[activeIndex],
              stageIndex: overSlot.stageIndex,
            };

            // 순서도 변경
            const [removed] = allSlots.splice(activeIndex, 1);
            allSlots.splice(overIndex, 0, removed);

            setFormData((prev) => ({
              ...prev,
              timetableSlots: allSlots,
            }));
          }
        }
      }
    }
    // 타임슬롯을 빈 스테이지로 드래그
    else if (
      activeIdStr.startsWith('slot-') &&
      overIdStr.startsWith('stage-')
    ) {
      const stageIndex = Number(overIdStr.replace('stage-', ''));
      const activeSlot = formData.timetableSlots.find(
        (s) => s.id === activeIdStr,
      );

      if (activeSlot && activeSlot.stageIndex !== stageIndex) {
        setFormData((prev) => ({
          ...prev,
          timetableSlots: prev.timetableSlots.map((slot) =>
            slot.id === activeIdStr ? { ...slot, stageIndex } : slot,
          ),
        }));
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setActiveType(null);

    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    // 아티스트를 스테이지로 드래그 (새 타임슬롯 생성)
    if (!activeIdStr.startsWith('slot-') && overIdStr.startsWith('stage-')) {
      const artistId = Number(active.id);
      const stageIndex = Number(overIdStr.replace('stage-', ''));

      const newSlot: TimetableSlot = {
        id: `slot-${Date.now()}`,
        date: selectedDay,
        stageIndex,
        artistId,
        startTime: '18:00',
        endTime: '19:00',
      };

      setFormData((prev) => ({
        ...prev,
        timetableSlots: [...prev.timetableSlots, newSlot],
      }));
    }
    // 타임슬롯을 아티스트 패널로 드래그 (삭제)
    else if (activeIdStr.startsWith('slot-') && overIdStr === 'artist-panel') {
      setFormData((prev) => ({
        ...prev,
        timetableSlots: prev.timetableSlots.filter(
          (slot) => slot.id !== activeIdStr,
        ),
      }));
    }
  };

  return {
    sensors,
    activeId,
    activeType,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
