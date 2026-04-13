import { useMemo, useState } from 'react';

import {
  analyticsCatalog,
  type AnalyticsCatalogRow,
} from '@confeti/analytics-catalog';

import Badge from '@shared/components/common/badge';
import EmptyState from '@shared/components/common/empty-state';
import Input from '@shared/components/common/input';
import Select from '@shared/components/common/select';

import * as styles from './analytics-events-page.css';

interface AnalyticsEventTypeGroup {
  key: string;
  title: string;
  rows: AnalyticsCatalogRow[];
}

interface AnalyticsPageGroup {
  path: string;
  rows: AnalyticsCatalogRow[];
  eventTypeGroups: AnalyticsEventTypeGroup[];
}

const AnalyticsEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [attributeFilter, setAttributeFilter] = useState('all');
  const [pathFilter, setPathFilter] = useState('all');

  const pathOptions = useMemo(
    () =>
      [...new Set(analyticsCatalog.rows.map((row) => row.path))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [],
  );

  const filteredRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return analyticsCatalog.rows.filter((row) => {
      const matchesSearch =
        normalizedQuery === '' ||
        [
          row.path,
          row.state,
          row.commonComponent,
          row.element,
          row.eventName,
          row.sourceFile,
          row.sourceComponent,
          ...row.params.flatMap((param) => [param.name, param.type]),
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      const matchesEventType =
        eventTypeFilter === 'all' || row.eventType === eventTypeFilter;
      const matchesAttribute =
        attributeFilter === 'all' ||
        (attributeFilter === 'common'
          ? row.attribute === '공통'
          : row.attribute !== '공통');
      const matchesPath = pathFilter === 'all' || row.path === pathFilter;

      return (
        matchesSearch && matchesEventType && matchesAttribute && matchesPath
      );
    });
  }, [attributeFilter, eventTypeFilter, pathFilter, searchQuery]);

  const groupedPages = useMemo(() => {
    const groupedMap = new Map<string, AnalyticsPageGroup>();

    filteredRows.forEach((row) => {
      const pageGroup = groupedMap.get(row.path);

      if (pageGroup) {
        pageGroup.rows.push(row);
        return;
      }

      groupedMap.set(row.path, {
        path: row.path,
        rows: [row],
        eventTypeGroups: [],
      });
    });

    return [...groupedMap.values()]
      .sort((left, right) => left.path.localeCompare(right.path))
      .map((pageGroup) => {
        const eventTypeMap = new Map<string, AnalyticsCatalogRow[]>();

        pageGroup.rows.forEach((row) => {
          const eventTypeKey = row.eventType;
          const nextRows = eventTypeMap.get(eventTypeKey) ?? [];
          nextRows.push(row);
          eventTypeMap.set(eventTypeKey, nextRows);
        });

        return {
          ...pageGroup,
          eventTypeGroups: [...eventTypeMap.entries()]
            .map(([eventTypeKey, rows]) => ({
              key: eventTypeKey,
              title: eventTypeKey === 'show' ? 'show 이벤트' : 'click 이벤트',
              rows: rows.sort((left, right) => {
                return (
                  left.state.localeCompare(right.state) ||
                  left.attribute.localeCompare(right.attribute) ||
                  left.eventName.localeCompare(right.eventName) ||
                  left.sourceFile.localeCompare(right.sourceFile) ||
                  left.sourceComponent.localeCompare(right.sourceComponent)
                );
              }),
            }))
            .sort((left, right) => {
              const eventTypeOrder = ['show', 'click'];

              return (
                eventTypeOrder.indexOf(left.key) -
                eventTypeOrder.indexOf(right.key)
              );
            }),
        };
      });
  }, [filteredRows]);

  const totalRowCount = analyticsCatalog.rows.length;
  const totalPageCount = useMemo(
    () => new Set(analyticsCatalog.rows.map((row) => row.path)).size,
    [],
  );
  const totalCommonCount = useMemo(
    () =>
      analyticsCatalog.rows.filter((row) => row.attribute === '공통').length,
    [],
  );
  const totalUniqueEventCount = useMemo(
    () => new Set(analyticsCatalog.rows.map((row) => row.eventName)).size,
    [],
  );
  const generatedAtText = useMemo(
    () =>
      new Intl.DateTimeFormat('ko-KR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(analyticsCatalog.generatedAt)),
    [],
  );

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>이벤트 카탈로그</h1>
          <p className={styles.pageSubtitle}>
            click-events.ts, show-events.ts, 실제 로깅 사용처를 기준으로 자동
            생성된 인벤토리예요.
          </p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.metaLabel}>마지막 생성</span>
          <strong className={styles.metaValue}>{generatedAtText}</strong>
          <code className={styles.command}>pnpm analytics:generate</code>
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <SummaryCard label="전체 페이지" value={String(totalPageCount)} />
        <SummaryCard label="전체 로깅 요소" value={String(totalRowCount)} />
        <SummaryCard label="공통 이벤트 행" value={String(totalCommonCount)} />
        <SummaryCard
          label="고유 이벤트명"
          value={String(totalUniqueEventCount)}
        />
      </div>

      <div className={styles.filterCard}>
        <div className={styles.filterGrid}>
          <Input
            label="검색"
            placeholder="경로, 이벤트명, 파라미터, 소스로 검색해요."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <Select
            label="이벤트 타입"
            value={eventTypeFilter}
            onChange={(event) => setEventTypeFilter(event.target.value)}
          >
            <option value="all">전체</option>
            <option value="click">click</option>
            <option value="show">show</option>
          </Select>
          <Select
            label="속성"
            value={attributeFilter}
            onChange={(event) => setAttributeFilter(event.target.value)}
          >
            <option value="all">전체</option>
            <option value="common">공통</option>
            <option value="page">페이지 전용</option>
          </Select>
          <Select
            label="경로"
            value={pathFilter}
            onChange={(event) => setPathFilter(event.target.value)}
          >
            <option value="all">전체</option>
            {pathOptions.map((path) => (
              <option key={path} value={path}>
                {path}
              </option>
            ))}
          </Select>
        </div>
        <p className={styles.filterResult}>
          현재 {groupedPages.length}개 페이지에서 {filteredRows.length}개 로깅
          요소를 보고 있어요.
        </p>
      </div>

      {groupedPages.length === 0 ? (
        <EmptyState
          title="조건에 맞는 이벤트가 없어요."
          description="검색어 또는 필터를 다시 확인해 주세요."
        />
      ) : (
        <div className={styles.groupList}>
          {groupedPages.map((pageGroup) => (
            <section key={pageGroup.path} className={styles.pageSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleBox}>
                  <h2 className={styles.sectionTitle}>{pageGroup.path}</h2>
                  <div className={styles.sectionMeta}>
                    <Badge variant="success">
                      {pageGroup.rows.length}개 요소
                    </Badge>
                    <Badge variant="neutral">
                      {
                        pageGroup.rows.filter((row) => row.attribute === '공통')
                          .length
                      }
                      개 공통
                    </Badge>
                  </div>
                </div>
              </div>

              <div className={styles.eventTypeGroupList}>
                {pageGroup.eventTypeGroups.map((eventTypeGroup) => (
                  <div
                    key={eventTypeGroup.key}
                    className={styles.eventTypeSection}
                  >
                    <div className={styles.eventTypeHeader}>
                      <h3 className={styles.eventTypeTitle}>
                        {eventTypeGroup.title}
                      </h3>
                      <Badge variant="neutral">
                        {eventTypeGroup.rows.length}개 이벤트
                      </Badge>
                    </div>

                    <div className={styles.tableWrapper}>
                      <table className={styles.table}>
                        <thead className={styles.tableHead}>
                          <tr>
                            <th className={styles.tableHeader}>이벤트</th>
                            <th className={styles.tableHeader}>요소</th>
                            <th className={styles.tableHeader}>파라미터</th>
                            <th className={styles.tableHeader}>소스</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventTypeGroup.rows.map((row, index) => (
                            <tr
                              key={`${row.eventName}-${row.sourceFile}-${row.sourceComponent}-${index}`}
                              className={styles.tableRow}
                            >
                              <td className={styles.tableCell}>
                                <div className={styles.eventCell}>
                                  <code className={styles.eventName}>
                                    {row.eventName}
                                  </code>
                                  <div className={styles.badgeRow}>
                                    <Badge
                                      variant={
                                        row.eventType === 'show'
                                          ? 'success'
                                          : 'neutral'
                                      }
                                    >
                                      {row.eventType}
                                    </Badge>
                                    {row.showType && (
                                      <Badge variant="warning">
                                        {row.showType}
                                      </Badge>
                                    )}
                                    {row.attribute === '공통' && (
                                      <Badge variant="primary">공통</Badge>
                                    )}
                                  </div>
                                  {row.state && row.eventName !== row.state && (
                                    <span className={styles.rowState}>
                                      상태: {row.state}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className={styles.tableCell}>
                                <div className={styles.elementCell}>
                                  <strong className={styles.elementTitle}>
                                    {row.element}
                                  </strong>
                                  {row.commonComponent && (
                                    <span className={styles.subText}>
                                      {row.commonComponent}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className={styles.tableCell}>
                                {row.params.length === 0 ? (
                                  <span className={styles.emptyValue}>
                                    없음
                                  </span>
                                ) : (
                                  <div className={styles.paramList}>
                                    {row.params.map((param) => (
                                      <div
                                        key={`${row.eventName}-${param.name}`}
                                        className={styles.paramCard}
                                      >
                                        <div className={styles.paramHeader}>
                                          <strong>{param.name}</strong>
                                          <code className={styles.paramType}>
                                            {param.type}
                                          </code>
                                        </div>
                                        <span className={styles.paramMeta}>
                                          {param.required ? '필수' : '선택'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>
                              <td className={styles.tableCell}>
                                <div className={styles.sourceCell}>
                                  <code className={styles.sourceFile}>
                                    {row.sourceFile}
                                  </code>
                                  <span className={styles.subText}>
                                    {row.sourceComponent}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

interface SummaryCardProps {
  label: string;
  value: string;
}

const SummaryCard = ({ label, value }: SummaryCardProps) => {
  return (
    <div className={styles.summaryCard}>
      <span className={styles.summaryLabel}>{label}</span>
      <strong className={styles.summaryValue}>{value}</strong>
    </div>
  );
};

export default AnalyticsEventsPage;
