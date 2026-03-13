import { useSuspenseQuery } from '@tanstack/react-query';
import { Clock, MoreVertical, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import { Badge, Button, EmptyState } from '@shared/components/common';
import { PATH } from '@shared/constants';
import { getDraftItems } from '@shared/models/draft';

import * as styles from './pending-page.css';

const PendingPage = () => {
  const navigate = useNavigate();

  const { data } = useSuspenseQuery(DRAFT_QUERY_OPTIONS.LIST());
  const draftItems = getDraftItems(data);

  const handleCreateNew = () => {
    navigate(PATH.PERFORMANCE_EDITOR.replace(':id', 'new'));
  };

  const handleSelectItem = (id: number) => {
    navigate(PATH.PERFORMANCE_EDITOR.replace(':id', String(id)));
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
        <EmptyState
          icon={<Clock size={48} />}
          title="대기 중인 공연이 없습니다."
        />
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
                <Button
                  variant="ghost"
                  size="small"
                  className={styles.moreButton}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPage;
