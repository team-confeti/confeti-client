import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { DRAFT_MUTATION_OPTIONS } from '@shared/apis/draft-mutations';
import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import {
  Badge,
  Button,
  ConfirmDialog,
  EmptyState,
} from '@shared/components/common';
import { PATH } from '@shared/constants';
import { getDraftItems } from '@shared/models/draft';

import * as styles from './pending-page.css';

const PendingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { data } = useSuspenseQuery(DRAFT_QUERY_OPTIONS.LIST());
  const draftItems = getDraftItems(data);

  const { mutate: deleteDraft } = useMutation({
    ...DRAFT_MUTATION_OPTIONS.DELETE_DRAFT(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DRAFT_QUERY_OPTIONS.LIST().queryKey,
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
        <div className={styles.listContainer}>
          {draftItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectItem(item.id)}
              className={styles.listItem}
            >
              <div className={styles.itemContent}>
                <div
                  className={styles.itemIcon}
                  style={{
                    backgroundColor:
                      item.performanceType === 'FESTIVAL'
                        ? '#AD46FF'
                        : '#00BC7D',
                  }}
                >
                  <span className={styles.typeIcon}>
                    {item.performanceType === 'FESTIVAL' ? 'F' : 'C'}
                  </span>
                </div>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
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
          ))}
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
