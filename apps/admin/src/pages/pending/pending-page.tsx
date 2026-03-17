import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { DRAFT_MUTATION_OPTIONS } from '@shared/apis/draft-mutations';
import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import {
  Badge,
  Button,
  ConfirmDialog,
  EmptyState,
} from '@shared/components/common';
import { PATH } from '@shared/constants';
import { DRAFT_QUERY_KEY } from '@shared/constants/query-key';
import {
  getDraftItems,
  getDraftPerformanceTypeMeta,
} from '@shared/models/draft';
import type { PerformanceDraftType } from '@shared/types/api';

import * as styles from './pending-page.css';

type PendingPerformanceTypeFilter = 'ALL' | PerformanceDraftType;

const PENDING_PERFORMANCE_TYPE_FILTERS = [
  { label: '전체', value: 'ALL' },
  { label: '페스티벌', value: 'FESTIVAL' },
  { label: '콘서트', value: 'CONCERT' },
] as const;

const PendingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [selectedPerformanceTypeFilter, setSelectedPerformanceTypeFilter] =
    useState<PendingPerformanceTypeFilter>('ALL');

  const search = searchQuery.trim() || undefined;
  const { data } = useSuspenseQuery(DRAFT_QUERY_OPTIONS.LIST(search));
  const draftItems = getDraftItems(data);
  const festivalDraftCount = draftItems.filter(
    ({ performanceType }) => performanceType === 'FESTIVAL',
  ).length;
  const concertDraftCount = draftItems.filter(
    ({ performanceType }) => performanceType === 'CONCERT',
  ).length;
  const performanceTypeFilters = PENDING_PERFORMANCE_TYPE_FILTERS.map(
    (filter) => ({
      ...filter,
      count:
        filter.value === 'ALL'
          ? draftItems.length
          : filter.value === 'FESTIVAL'
            ? festivalDraftCount
            : concertDraftCount,
    }),
  );
  const filteredDraftItems = draftItems.filter(
    ({ performanceType }) =>
      selectedPerformanceTypeFilter === 'ALL' ||
      performanceType === selectedPerformanceTypeFilter,
  );
  const filteredEmptyStateTitle =
    selectedPerformanceTypeFilter === 'ALL'
      ? '대기 중인 공연이 없습니다.'
      : `${getDraftPerformanceTypeMeta(selectedPerformanceTypeFilter).label} 대기 공연이 없어요.`;

  const { mutate: deleteDraft } = useMutation({
    ...DRAFT_MUTATION_OPTIONS.DELETE_DRAFT(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DRAFT_QUERY_KEY.ALL,
      });
      setDeleteTargetId(null);
    },
  });

  const handleCreateNew = () => {
    navigate(PATH.PERFORMANCE_EDITOR.replace(':id', 'new'));
  };

  const handleSelectItem = (id: number) => {
    navigate(PATH.PERFORMANCE_EDITOR.replace(':id', String(id)));
  };

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      deleteDraft(deleteTargetId);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>대기 중인 공연</h2>
          <p className={styles.subtitle}>
            크롤링된 공연 정보를 검토하고 등록하세요.
          </p>
        </div>
        <Button
          onClick={handleCreateNew}
          leftIcon={<Plus size={16} />}
          className={styles.createButton}
        >
          수기 등록
        </Button>
      </div>

      {draftItems.length === 0 ? (
        <div className={styles.emptyState}>
          <EmptyState
            icon={<Clock size={48} />}
            title="대기 중인 공연이 없습니다."
          />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.filterSection}>
            <div className={styles.filterList}>
              {performanceTypeFilters.map((filter) => {
                const isSelected =
                  selectedPerformanceTypeFilter === filter.value;
                const selectedFilterClassName =
                  filter.value === 'ALL'
                    ? styles.filterButtonActive.ALL
                    : filter.value === 'FESTIVAL'
                      ? styles.filterButtonActive.FESTIVAL
                      : styles.filterButtonActive.CONCERT;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={isSelected}
                    className={
                      isSelected ? selectedFilterClassName : styles.filterButton
                    }
                    onClick={() =>
                      setSelectedPerformanceTypeFilter(filter.value)
                    }
                  >
                    {filter.label} {filter.count}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.listContainer}>
            {filteredDraftItems.length === 0 ? (
              <div className={styles.emptyState}>
                <EmptyState
                  icon={<Clock size={48} />}
                  title={filteredEmptyStateTitle}
                  description="다른 타입을 선택하면 다른 공연을 볼 수 있어요."
                />
              </div>
            ) : (
              filteredDraftItems.map((item) => {
                const performanceTypeMeta = getDraftPerformanceTypeMeta(
                  item.performanceType,
                );
                const typeBadgeClassName =
                  item.performanceType === 'FESTIVAL'
                    ? styles.typeBadgeFestival
                    : styles.typeBadgeConcert;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item.id)}
                    className={styles.listItem}
                  >
                    <div className={styles.itemContent}>
                      <div
                        className={styles.itemIcon}
                        style={{ backgroundColor: performanceTypeMeta.color }}
                      >
                        <span className={styles.typeIcon}>
                          {performanceTypeMeta.symbol}
                        </span>
                      </div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemTitleRow}>
                          <h3 className={styles.itemTitle}>{item.title}</h3>
                          <span
                            className={`${styles.typeBadge} ${typeBadgeClassName}`}
                          >
                            {performanceTypeMeta.label}
                          </span>
                        </div>
                        <div className={styles.itemMeta}>
                          <span>{item.startAt}</span>
                          <span className={styles.dot}>•</span>
                          <span>{item.area || '장소 미정'}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.itemActions}>
                      <Badge variant="warning">{item.status}</Badge>
                      <button
                        className={styles.moreButton}
                        onClick={(e) => handleDeleteClick(e, item.id)}
                        title="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="공연 삭제"
        message="이 공연을 삭제하시겠습니까? 삭제된 공연은 복구할 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        risk="high"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default PendingPage;
