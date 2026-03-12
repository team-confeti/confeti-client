import { Dispatch, SetStateAction, useState } from 'react';

import type { PerformanceFormData, TimetableSlot } from '../types';

interface UseModalsProps {
  formData: PerformanceFormData;
  setFormData: Dispatch<SetStateAction<PerformanceFormData>>;
}

export const useModals = ({ setFormData }: UseModalsProps) => {
  // Timeslot modal state
  const [showTimeslotModal, setShowTimeslotModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);

  // Collab artist modal state
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [collabArtistName, setCollabArtistName] = useState('');

  // Schedule sync state
  const [scheduleSynced, setScheduleSynced] = useState(false);

  // Timeslot modal handlers
  const handleOpenTimeslotModal = (slot: TimetableSlot) => {
    setEditingSlot(slot);
    setShowTimeslotModal(true);
  };

  const handleCloseTimeslotModal = () => {
    setEditingSlot(null);
    setShowTimeslotModal(false);
  };

  const handleUpdateTimeslot = () => {
    if (!editingSlot) return;

    setFormData((prev) => ({
      ...prev,
      timetableSlots: prev.timetableSlots.map((slot) =>
        slot.id === editingSlot.id ? editingSlot : slot,
      ),
    }));

    handleCloseTimeslotModal();
  };

  const handleDeleteTimeslot = () => {
    if (!editingSlot) return;

    setFormData((prev) => ({
      ...prev,
      timetableSlots: prev.timetableSlots.filter(
        (slot) => slot.id !== editingSlot.id,
      ),
    }));

    handleCloseTimeslotModal();
  };

  // Collab artist modal handlers
  const handleOpenCollabModal = () => {
    setShowCollabModal(true);
  };

  const handleCloseCollabModal = () => {
    setShowCollabModal(false);
    setCollabArtistName('');
  };

  const handleAddCollabArtist = () => {
    if (!collabArtistName.trim()) return;

    const newArtist = {
      id: Date.now(),
      name: collabArtistName.trim(),
    };

    setFormData((prev) => ({
      ...prev,
      artists: [...prev.artists, newArtist],
    }));

    handleCloseCollabModal();
  };

  // Schedule sync handler
  const handleSyncSchedule = () => {
    setScheduleSynced(true);
    setTimeout(() => {
      setScheduleSynced(false);
    }, 2000);
  };

  return {
    // Timeslot modal
    showTimeslotModal,
    editingSlot,
    setEditingSlot,
    handleOpenTimeslotModal,
    handleCloseTimeslotModal,
    handleUpdateTimeslot,
    handleDeleteTimeslot,

    // Collab modal
    showCollabModal,
    collabArtistName,
    setCollabArtistName,
    handleOpenCollabModal,
    handleCloseCollabModal,
    handleAddCollabArtist,

    // Schedule sync
    scheduleSynced,
    handleSyncSchedule,
  };
};
