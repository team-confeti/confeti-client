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
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

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
import {
  getDraftItems,
  mapDraftDetailToExistingPerformance,
  mapDraftListItemToExistingPerformance,
} from '@shared/models/draft';
import { mapFestivalDetailToExistingPerformance } from '@shared/models/festival';
import { getTicketVendors } from '@shared/models/ticket-vendor';
import type { DraftListQueryResponse } from '@shared/types/api';
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
import {
  buildConcertRequest,
  buildDraftPerformanceData,
  buildFestivalRequest,
  getConcertRequestValidationMessage,
  getFestivalRequestValidationMessage,
  getPublishedPerformanceId,
  getPublishValidationMessage,
  getSubmitButtonText,
} from './performance-editor-helpers';
import type { ExistingPerformance } from './types';

import * as styles from './performance-editor-page.css';

type TabKey = 'basic' | 'detail' | 'lineup' | 'timetable';

const PerformanceEditorContent = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { state } = useLocation() as {
    state?: { initialPerformance?: ExistingPerformance };
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const ticketVendors = getTicketVendors(ticketVendorData);
  const { mutateAsync: postDraftMutate, isPending: isPostPending } =
    useMutation(DRAFT_MUTATION_OPTIONS.POST_DRAFT());
  const { mutateAsync: patchDraftMutate, isPending: isPatchPending } =
    useMutation(DRAFT_MUTATION_OPTIONS.PATCH_DRAFT());
  const { mutateAsync: deleteDraftMutate, isPending: isDeletePending } =
    useMutation(DRAFT_MUTATION_OPTIONS.DELETE_DRAFT());
  const { mutateAsync: putConcertMutate, isPending: isConcertPending } =
    useMutation(CONCERT_MUTATION_OPTIONS.PUT_CONCERT());
  const {
    mutateAsync: deleteConcertMutate,
    isPending: isDeleteConcertPending,
  } = useMutation(CONCERT_MUTATION_OPTIONS.DELETE_CONCERT());
  const { mutateAsync: putFestivalMutate, isPending: isFestivalPending } =
    useMutation(FESTIVAL_MUTATION_OPTIONS.PUT_FESTIVAL());
  const {
    mutateAsync: deleteFestivalMutate,
    isPending: isDeleteFestivalPending,
  } = useMutation(FESTIVAL_MUTATION_OPTIONS.DELETE_FESTIVAL());

  const isSaving =
    isPostPending ||
    isPatchPending ||
    isDeletePending ||
    isConcertPending ||
    isDeleteConcertPending ||
    isFestivalPending ||
    isDeleteFestivalPending;
  const isSubmittingRef = useRef(false);
  const cachedDraftItem = queryClient
    .getQueriesData<DraftListQueryResponse>({
      queryKey: DRAFT_QUERY_KEY.ALL,
    })
    .flatMap(([, cachedDraftData]) => getDraftItems(cachedDraftData))
    .find((draftItem) => String(draftItem.id) === id);
  const initialPerformance =
    state?.initialPerformance ??
    (cachedDraftItem
      ? mapDraftListItemToExistingPerformance(cachedDraftItem)
      : null);
  const existingPerformance: ExistingPerformance | null = (() => {
    if (isNew) return null;
    if (draftData) return mapDraftDetailToExistingPerformance(draftData);
    if (concertData)
      return mapConcertDetailToExistingPerformance(concertData, ticketVendors);
    if (festivalData)
      return mapFestivalDetailToExistingPerformance(festivalData);
    return null;
  })();

  const [activeTab, setActiveTab] = useState<TabKey>('basic');
  const [selectedDay, setSelectedDay] = useState<string>('');

  // Custom hooks
  const initialType =
    isNew && performanceType === 'concert'
      ? ('Concert' as const)
      : isNew && performanceType === 'festival'
        ? ('Festival' as const)
        : undefined;

  const { formData, setFormData, handleInputChange } = usePerformanceForm({
    existingPerformance,
    initialPerformance,
    initialType,
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
    handleToggleArtistFestivalDate,
  } = useArtistManagement({ formData, setFormData });

  const {
    sensors,
    activeId,
    activeType,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useTimetableDnd({
    formData,
    setFormData,
    selectedDay:
      selectedDay &&
      generateDateRange(formData.startDate, formData.endDate).includes(
        selectedDay,
      )
        ? selectedDay
        : (generateDateRange(formData.startDate, formData.endDate)[0] ?? ''),
  });

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
  } = useModals({ setFormData });

  // 날짜 배열 생성 (startDate ~ endDate)
  const daysArray = generateDateRange(formData.startDate, formData.endDate);
  const currentSelectedDay =
    selectedDay && daysArray.includes(selectedDay)
      ? selectedDay
      : (daysArray[0] ?? '');
  const isConcert = formData.type === 'Concert';
  const currentActiveTab =
    isConcert && activeTab === 'timetable' ? 'basic' : activeTab;
  const showDeleteAction = !isNew;
  const submitButtonText = getSubmitButtonText(
    formData,
    performanceType,
    isNew,
  );

  const handleTabChange = (tabKey: TabKey) => {
    setShowArtistDropdown(false);
    setActiveTab(tabKey);
  };

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

  const handleSubmit = async () => {
    if (isSubmittingRef.current || isSaving) return;
    isSubmittingRef.current = true;

    const resetRef = () => {
      isSubmittingRef.current = false;
    };
    const publishValidationMessage = getPublishValidationMessage(
      formData,
      performanceType,
    );
    const publishedPerformanceId = getPublishedPerformanceId(
      performanceType,
      id,
      formData,
    );

    try {
      if (performanceType === 'concert') {
        if (!formData.mainPoster) {
          adminToast.error({
            text: '콘서트 포스터 이미지를 다시 등록해주세요.',
          });
          return;
        }

        const concertRequest = buildConcertRequest(
          formData,
          publishedPerformanceId,
        );
        const concertValidationMessage =
          getConcertRequestValidationMessage(concertRequest);

        if (concertValidationMessage) {
          adminToast.error({ text: concertValidationMessage });
          return;
        }

        await putConcertMutate({
          concert: concertRequest,
          poster: formData.mainPoster,
        });
        await queryClient.invalidateQueries({
          queryKey: CONCERT_QUERY_KEY.ALL,
        });
        adminToast.success({ text: '콘서트가 저장되었습니다.' });
        navigate(PATH.CONCERT);
        return;
      }

      if (performanceType === 'festival') {
        const festivalRequest = buildFestivalRequest(
          formData,
          publishedPerformanceId,
        );
        const festivalValidationMessage =
          getFestivalRequestValidationMessage(festivalRequest);

        if (festivalValidationMessage) {
          adminToast.error({ text: festivalValidationMessage });
          return;
        }

        await putFestivalMutate({
          festival: festivalRequest,
          poster: formData.mainPoster ?? undefined,
          logo: formData.logo ?? undefined,
        });
        await queryClient.invalidateQueries({
          queryKey: FESTIVAL_QUERY_KEY.ALL,
        });
        adminToast.success({ text: '페스티벌이 저장되었습니다.' });
        navigate(PATH.FESTIVAL);
        return;
      }

      if (publishValidationMessage === null) {
        if (formData.type === 'Concert') {
          if (!formData.mainPoster) {
            adminToast.error({
              text: '콘서트 포스터 이미지를 다시 등록해주세요.',
            });
            return;
          }

          const concertRequest = buildConcertRequest(
            formData,
            publishedPerformanceId,
          );
          const concertValidationMessage =
            getConcertRequestValidationMessage(concertRequest);

          if (concertValidationMessage) {
            adminToast.error({ text: concertValidationMessage });
            return;
          }

          await putConcertMutate({
            concert: concertRequest,
            poster: formData.mainPoster,
          });
          if (!isNew && id && Number.isFinite(Number(id))) {
            try {
              await deleteDraftMutate(Number(id));
            } catch {
              adminToast.error({
                text: '게시는 완료되었지만 대기 목록 정리에 실패했어요.',
              });
            }
          }
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: CONCERT_QUERY_KEY.ALL }),
            queryClient.invalidateQueries({ queryKey: DRAFT_QUERY_KEY.ALL }),
          ]);
          adminToast.success({ text: '콘서트가 게시되었습니다.' });
          navigate(PATH.CONCERT);
          return;
        }

        const festivalRequest = buildFestivalRequest(
          formData,
          publishedPerformanceId,
        );
        const festivalValidationMessage =
          getFestivalRequestValidationMessage(festivalRequest);

        if (festivalValidationMessage) {
          adminToast.error({ text: festivalValidationMessage });
          return;
        }

        await putFestivalMutate({
          festival: festivalRequest,
          poster: formData.mainPoster ?? undefined,
          logo: formData.logo ?? undefined,
        });
        if (!isNew && id && Number.isFinite(Number(id))) {
          try {
            await deleteDraftMutate(Number(id));
          } catch {
            adminToast.error({
              text: '게시는 완료되었지만 대기 목록 정리에 실패했어요.',
            });
          }
        }
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: FESTIVAL_QUERY_KEY.ALL }),
          queryClient.invalidateQueries({ queryKey: DRAFT_QUERY_KEY.ALL }),
        ]);
        adminToast.success({ text: '페스티벌이 게시되었습니다.' });
        navigate(PATH.FESTIVAL);
        return;
      }

      const performanceData = buildDraftPerformanceData(formData);

      if (isNew) {
        if (!formData.mainPoster) {
          adminToast.error({ text: '포스터 이미지를 등록해주세요.' });
          return;
        }

        await postDraftMutate({
          performanceType:
            formData.type === 'Festival' ? 'FESTIVAL' : 'CONCERT',
          performanceData,
          posterImage: formData.mainPoster,
          ...(formData.logo && { logoImage: formData.logo }),
        });
      } else if (id && Number.isFinite(Number(id))) {
        await patchDraftMutate({
          draftId: Number(id),
          request: {
            performanceData,
            ...(formData.mainPoster && { posterImage: formData.mainPoster }),
            ...(formData.logo && { logoImage: formData.logo }),
          },
        });
      }

      await queryClient.invalidateQueries({ queryKey: DRAFT_QUERY_KEY.ALL });
      adminToast.success({ text: '공연이 저장되었습니다.' });
      navigate(PATH.PENDING);
    } catch (error) {
      adminToast.error({
        text: error instanceof Error ? error.message : '저장에 실패했습니다.',
      });
    } finally {
      resetRef();
    }
  };

  const handleDelete = async () => {
    if (!showDeleteAction || !id || !Number.isFinite(Number(id))) {
      return;
    }

    try {
      if (performanceType === 'concert') {
        await deleteConcertMutate(Number(id));
        await queryClient.invalidateQueries({
          queryKey: CONCERT_QUERY_KEY.ALL,
        });
        adminToast.success({ text: '콘서트가 삭제되었습니다.' });
        navigate(PATH.CONCERT);
        return;
      }

      if (performanceType === 'festival') {
        await deleteFestivalMutate(Number(id));
        await queryClient.invalidateQueries({
          queryKey: FESTIVAL_QUERY_KEY.ALL,
        });
        adminToast.success({ text: '페스티벌이 삭제되었습니다.' });
        navigate(PATH.FESTIVAL);
        return;
      }

      await deleteDraftMutate(Number(id));
      await queryClient.invalidateQueries({ queryKey: DRAFT_QUERY_KEY.ALL });
      adminToast.success({ text: '공연이 삭제되었습니다.' });
      navigate(PATH.PENDING);
    } catch (error) {
      adminToast.error({
        text: error instanceof Error ? error.message : '삭제에 실패했습니다.',
      });
    }
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
            {showDeleteAction && (
              <button onClick={handleDelete} className={styles.deleteButton}>
                <Trash2 size={16} />
                삭제
              </button>
            )}
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
              {isSaving ? '저장 중...' : submitButtonText}
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
                onClick={() => handleTabChange(tab.key)}
                className={
                  currentActiveTab === tab.key ? styles.tabActive : styles.tab
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
          {currentActiveTab === 'basic' && (
            <BasicInfoTab
              formData={formData}
              ticketVendors={ticketVendors}
              showScheduleSyncButton={!isConcert}
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
          {currentActiveTab === 'detail' && (
            <DetailInfoTab
              formData={formData}
              handleInputChange={handleInputChange}
              handleAddPriceGrade={handleAddPriceGrade}
              handleRemovePriceGrade={handleRemovePriceGrade}
              handlePriceGradeChange={handlePriceGradeChange}
              handleFileChange={handleFileChange}
            />
          )}
          {currentActiveTab === 'lineup' && (
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
              handleToggleArtistFestivalDate={handleToggleArtistFestivalDate}
              setActiveTab={handleTabChange}
              isConcert={isConcert}
              daysArray={daysArray}
            />
          )}
          {currentActiveTab === 'timetable' && (
            <TimetableTab
              formData={formData}
              daysArray={daysArray}
              selectedDay={currentSelectedDay}
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
