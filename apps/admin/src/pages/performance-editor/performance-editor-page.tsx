import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Calendar,
  FileText,
  Image,
  Loader2,
  Save,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { CONCERT_MUTATION_OPTIONS } from '@shared/apis/concert-mutations';
import { CONCERT_QUERY_OPTIONS } from '@shared/apis/concert-queries';
import { DRAFT_MUTATION_OPTIONS } from '@shared/apis/draft-mutations';
import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import { FESTIVAL_MUTATION_OPTIONS } from '@shared/apis/festival-mutations';
import { FESTIVAL_QUERY_OPTIONS } from '@shared/apis/festival-queries';
import { TICKET_VENDOR_QUERY_OPTIONS } from '@shared/apis/ticket-vendor-queries';
import { Input, Select } from '@shared/components/common';
import { PATH } from '@shared/constants';
import {
  CONCERT_QUERY_KEY,
  DRAFT_QUERY_KEY,
  FESTIVAL_QUERY_KEY,
} from '@shared/constants/query-key';
import { mapConcertDetailToExistingPerformance } from '@shared/models/concert';
import { mapDraftDetailToExistingPerformance } from '@shared/models/draft';
import { mapFestivalDetailToExistingPerformance } from '@shared/models/festival';
import { fileToBase64, generateDateRange } from '@shared/utils';
import { adminToast } from '@shared/utils/admin-toast';

import { BasicInfoTab } from './components/basic-info-tab';
import { DetailInfoTab } from './components/detail-info-tab';
import { LineupTab } from './components/lineup-tab';
import { TimetableTab } from './components/timetable-tab';
import { useArtistManagement } from './hooks/use-artist-management';
import { useBookingSchedule } from './hooks/use-booking-schedule';
import { useModals } from './hooks/use-modals';
import { usePerformanceForm } from './hooks/use-performance-form';
import { usePriceGrades } from './hooks/use-price-grades';
import { useStageManagement } from './hooks/use-stage-management';
import { useTicketingPlatformManagement } from './hooks/use-ticketing-platform-management';
import { useTimetableDnd } from './hooks/use-timetable-dnd';
import type { ExistingPerformance } from './types';

import * as styles from './performance-editor-page.css';

type TabKey = 'basic' | 'detail' | 'lineup' | 'timetable';

const PerformanceEditorContent = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const performanceType = searchParams.get('type');
  const { data: draftData } = useQuery({
    ...DRAFT_QUERY_OPTIONS.DETAIL(Number(id)),
    enabled: !isNew && !performanceType,
  });
  const { data: concertData } = useQuery({
    ...CONCERT_QUERY_OPTIONS.DETAIL(Number(id)),
    enabled: !isNew && performanceType === 'concert',
  });
  const { data: festivalData } = useQuery({
    ...FESTIVAL_QUERY_OPTIONS.DETAIL(Number(id)),
    enabled: !isNew && performanceType === 'festival',
  });
  const { data: ticketVendorData } = useQuery(
    TICKET_VENDOR_QUERY_OPTIONS.LIST(),
  );

  const queryClient = useQueryClient();
  const { mutate: postMutate, isPending: isPostPending } = useMutation({
    ...DRAFT_MUTATION_OPTIONS.POST_DRAFT(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFT_QUERY_KEY.ALL });
      adminToast.success({ text: '공연이 저장되었습니다.' });
      navigateToList();
    },
    onError: (error) => {
      adminToast.error({
        text: error.message || '저장에 실패했습니다.',
      });
    },
  });
  const { mutate: patchMutate, isPending: isPatchPending } = useMutation({
    ...DRAFT_MUTATION_OPTIONS.PATCH_DRAFT(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFT_QUERY_KEY.ALL });
      adminToast.success({ text: '공연이 저장되었습니다.' });
      navigateToList();
    },
    onError: (error) => {
      adminToast.error({
        text: error.message || '저장에 실패했습니다.',
      });
    },
  });
  const { mutate: deleteMutate } = useMutation({
    ...DRAFT_MUTATION_OPTIONS.DELETE_DRAFT(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFT_QUERY_KEY.ALL });
      navigateToList();
    },
  });

  const { mutate: putConcertMutate, isPending: isConcertPending } = useMutation(
    {
      ...CONCERT_MUTATION_OPTIONS.PUT_CONCERT(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CONCERT_QUERY_KEY.ALL });
        adminToast.success({ text: '콘서트가 저장되었습니다.' });
        navigate(PATH.CONCERT);
      },
      onError: (error) => {
        adminToast.error({
          text: error.message || '저장에 실패했습니다.',
        });
      },
    },
  );
  const { mutate: putFestivalMutate, isPending: isFestivalPending } =
    useMutation({
      ...FESTIVAL_MUTATION_OPTIONS.PUT_FESTIVAL(),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FESTIVAL_QUERY_KEY.ALL,
        });
        adminToast.success({ text: '페스티벌이 저장되었습니다.' });
        navigate(PATH.FESTIVAL);
      },
      onError: (error) => {
        adminToast.error({
          text: error.message || '저장에 실패했습니다.',
        });
      },
    });

  const isSaving =
    isPostPending || isPatchPending || isConcertPending || isFestivalPending;
  const isSubmittingRef = useRef(false);
  const existingPerformance: ExistingPerformance | null = (() => {
    if (isNew) return null;
    if (draftData) return mapDraftDetailToExistingPerformance(draftData);
    if (concertData)
      return mapConcertDetailToExistingPerformance(
        concertData,
        ticketVendorData?.ticketVendors,
      );
    if (festivalData)
      return mapFestivalDetailToExistingPerformance(festivalData);
    return null;
  })();

  const [activeTab, setActiveTab] = useState<TabKey>('basic');
  const [selectedDay, setSelectedDay] = useState<string>('');

  // Custom hooks
  const { formData, setFormData, handleInputChange } = usePerformanceForm({
    existingPerformance,
  });

  const {
    handleAddBookingSchedule,
    handleRemoveBookingSchedule,
    handleBookingScheduleChange,
  } = useBookingSchedule({ formData, setFormData });

  const {
    handleToggleTicketingPlatform,
    handleRemoveTicketingPlatform,
    handleTicketingPlatformChange,
  } = useTicketingPlatformManagement({ formData, setFormData });

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
        adminToast.error({ text: '파일 업로드에 실패했습니다.' });
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
    if (isSubmittingRef.current || isSaving) return;
    isSubmittingRef.current = true;

    const resetRef = () => {
      isSubmittingRef.current = false;
    };
    if (performanceType === 'concert') {
      if (!formData.mainPoster) {
        adminToast.error({ text: '포스터 이미지를 등록해주세요.' });
        resetRef();
        return;
      }
      putConcertMutate(
        {
          request: {
            concertId: Number(id),
            title: formData.title,
            subtitle: formData.subtitle,
            startAt: formData.startDate,
            endAt: formData.endDate,
            area: formData.venueName,
            address: formData.venueAddress,
            reserveAt: formData.bookingSchedules[0]?.startDate ?? '',
            ageRating: formData.ageRating,
            time: `${formData.durationMinutes}분`,
            price: formData.priceGrades
              .map((g) => `${g.grade} ${g.price}`)
              .join(' / '),
            artistIds: formData.artists.map((a) => String(a.id)),
            reservationUrls: formData.selectedTicketingPlatforms.map((p) => ({
              ticketVendorId: p.id,
              reservationUrl: p.url,
            })),
          },
          poster: formData.mainPoster,
        },
        { onSettled: resetRef },
      );
    } else if (performanceType === 'festival') {
      if (!formData.mainPoster) {
        adminToast.error({ text: '포스터 이미지를 등록해주세요.' });
        resetRef();
        return;
      }
      putFestivalMutate(
        {
          request: {
            festivalId: Number(id),
            title: formData.title,
            subtitle: formData.subtitle,
            startAt: formData.startDate,
            endAt: formData.endDate,
            area: formData.venueName,
            address: formData.venueAddress,
            reserveAt: formData.bookingSchedules[0]?.startDate ?? '',
            ageRating: formData.ageRating,
            time: `${formData.durationMinutes}분`,
            price: formData.priceGrades
              .map((g) => `${g.grade} ${g.price}`)
              .join(' / '),
            reservationUrls: formData.selectedTicketingPlatforms.map((p) => ({
              ticketVendorId: p.id,
              reservationUrl: p.url,
            })),
            artistIds: formData.artists.map((a) => String(a.id)),
          },
          poster: formData.mainPoster,
          logo: formData.logo ?? undefined,
        },
        { onSettled: resetRef },
      );
    } else {
      const performanceData = JSON.stringify(formData);
      if (isNew) {
        if (!formData.mainPoster) {
          adminToast.error({ text: '포스터 이미지를 등록해주세요.' });
          resetRef();
          return;
        }
        postMutate(
          {
            performanceType:
              formData.type === 'Festival' ? 'FESTIVAL' : 'CONCERT',
            performanceData,
            posterImage: formData.mainPoster,
            ...(formData.logo && { logoImage: formData.logo }),
          },
          { onSettled: resetRef },
        );
      } else {
        patchMutate(
          {
            draftId: Number(id),
            request: {
              performanceData,
              ...(formData.mainPoster && {
                posterImage: formData.mainPoster,
              }),
              ...(formData.logo && { logoImage: formData.logo }),
            },
          },
          { onSettled: resetRef },
        );
      }
    }
  };

  const handleDelete = () => {
    deleteMutate(Number(id));
  };

  const navigateToList = () => {
    if (performanceType === 'concert') {
      navigate(PATH.CONCERT);
    } else if (performanceType === 'festival') {
      navigate(PATH.FESTIVAL);
    } else {
      navigate(PATH.PENDING);
    }
  };
  const handleClose = () => {
    navigateToList();
  };

  const isConcert = formData.type === 'Concert';
  const tabs = [
    { key: 'basic' as TabKey, label: '기본 정보', icon: FileText },
    { key: 'detail' as TabKey, label: '상세 정보 & 미디어', icon: Image },
    {
      key: 'lineup' as TabKey,
      label: isConcert ? '라인업' : '라인업 & 스테이지',
      icon: Users,
    },
    ...(isConcert
      ? []
      : [{ key: 'timetable' as TabKey, label: '타임테이블', icon: Calendar }]),
  ];

  if (isConcert && activeTab === 'timetable') {
    setActiveTab('basic');
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentCard}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <button onClick={handleClose} className={styles.closeButton}>
            <X size={20} />
          </button>
          <div className={styles.titleSection}>
            <div className={styles.titleRow}>
              <h1 className={styles.pageTitle}>
                {isNew ? '새 공연 등록' : formData.title || '공연 정보 수정'}
              </h1>
              {!isNew && performanceType && (
                <span className={styles.typeBadge}>
                  <span
                    className={
                      performanceType === 'festival'
                        ? styles.festivalDot
                        : styles.concertDot
                    }
                  />
                  {performanceType === 'festival' ? '페스티벌' : '콘서트'}
                </span>
              )}
            </div>
          </div>
          <div className={styles.headerActions}>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <Trash2 size={16} />
              삭제
            </button>
            <button
              onClick={handleSubmit}
              className={styles.saveButton}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 size={18} className={styles.buttonSpinner} />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? '저장 중...' : '저장 및 게시'}
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
              ticketVendors={ticketVendorData?.ticketVendors ?? []}
              handleInputChange={handleInputChange}
              handleAddBookingSchedule={handleAddBookingSchedule}
              handleRemoveBookingSchedule={handleRemoveBookingSchedule}
              handleBookingScheduleChange={handleBookingScheduleChange}
              handleToggleTicketingPlatform={handleToggleTicketingPlatform}
              handleRemoveTicketingPlatform={handleRemoveTicketingPlatform}
              handleTicketingPlatformChange={handleTicketingPlatformChange}
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
              isConcert={isConcert}
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

const PerformanceEditorPage = () => {
  const { id } = useParams();
  return <PerformanceEditorContent key={id} />;
};
export default PerformanceEditorPage;
