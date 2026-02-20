import { forwardRef, Fragment, useMemo } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import {
  HALF_HOUR_TO_MINUTES,
  HOUR_HEIGHT_PX,
  MINUTE_HEIGHT_PX,
} from '@pages/timetable/constants';
import {
  CAPTURE_HEIGHT,
  CAPTURE_STAGE_HEADER_HEIGHT,
} from '@pages/timetable/constants/capture';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';
import {
  calcMinutesFromOpen,
  calcTotalMinutes,
  generateTableRow,
  parseTimeString,
} from '@pages/timetable/utils';

import * as styles from './timetable-capture.css';

interface TimetableCaptureProps {
  boardData: TimetableInfo;
  posterUrl: string;
  festivalTitle: string;
  festivalDate: string;
  dayNumber: number;
}

function ConfetiLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 24"
      fill="none"
      width="80"
      height="66"
    >
      <path
        d="M31.1353 23.5H24.3901V8.38867H31.1353V23.5ZM18.6812 23.2812H11.7661V12.2842H18.6812V23.2812ZM7.56982 12.3086C7.77894 14.4948 9.57495 16.202 11.7603 16.2021V23.2734C5.76717 23.2733 0.886273 18.3992 0.666504 12.3086H7.56982ZM11.7642 7.57129C9.57869 7.57129 7.78275 9.27843 7.57373 11.4648H0.67041C0.886518 5.37044 5.77091 0.5 11.7642 0.5V7.57129ZM22.8696 0.507812H31.3335V7.59082H22.4868V7.58887C20.4778 7.77472 18.8769 9.4077 18.6802 11.4648H11.7759C11.9873 5.5009 16.6699 0.711222 22.4868 0.508789V0.507812H22.5513C22.6571 0.504752 22.7631 0.500004 22.8696 0.5V0.507812Z"
        fill="url(#paint0_linear_capture)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_capture"
          x1="14.2368"
          y1="-29.1874"
          x2="31.9403"
          y2="40.6546"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#89EA5D" />
          <stop offset="1" stopColor="#B5F602" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface ArtistEntry {
  name: string;
  totalMin: number;
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
}

const TimetableCapture = forwardRef<HTMLDivElement, TimetableCaptureProps>(
  ({ boardData, posterUrl, festivalTitle, festivalDate, dayNumber }, ref) => {
    const [openHour, openMin] = parseTimeString(boardData.ticketOpenAt);
    const tableRows = generateTableRow(openHour);

    const naturalHeight =
      CAPTURE_STAGE_HEADER_HEIGHT + tableRows.length * HOUR_HEIGHT_PX;
    const scaleFactor =
      naturalHeight > CAPTURE_HEIGHT ? CAPTURE_HEIGHT / naturalHeight : 1;

    const sortedArtists = useMemo<ArtistEntry[]>(() => {
      const entries: ArtistEntry[] = [];
      for (const stage of boardData.stages) {
        for (const block of stage.festivalTimes) {
          const [sh, sm] = parseTimeString(block.startAt);
          const [eh, em] = parseTimeString(block.endAt);
          const totalMin = calcTotalMinutes(sh, sm, eh, em);
          entries.push({
            name: block.artists.map((a) => a.artistName).join(', '),
            totalMin,
            startHour: sh,
            startMin: sm,
            endHour: eh,
            endMin: em,
          });
        }
      }
      entries.sort((a, b) => {
        const aMin = Number(a.startHour) * 60 + Number(a.startMin);
        const bMin = Number(b.startHour) * 60 + Number(b.startMin);
        return aMin - bMin;
      });
      return entries;
    }, [boardData.stages]);

    return (
      <div ref={ref} className={styles.captureRoot}>
        {/* ── Left Panel: Poster with blur overlay ── */}
        <div className={styles.posterPanel}>
          {posterUrl && (
            <img src={posterUrl} alt="" className={styles.posterBgImage} />
          )}
          <div className={styles.posterOverlay} />
          <div className={styles.posterContent}>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '61px' }}
            >
              {/* Title block */}
              <div className={styles.titleBlock}>
                <div className={styles.dayRow}>
                  <div className={styles.dayLabel}>
                    <span>DAY</span>
                    <span>{dayNumber}</span>
                  </div>
                  <div className={styles.dateLabel}>{festivalDate}</div>
                </div>
                <div className={styles.festivalTitle}>{festivalTitle}</div>
              </div>

              {/* Artist section */}
              <div className={styles.artistSection}>
                <div className={styles.separator} />
                <div className={styles.artistList}>
                  {sortedArtists.map((entry, i) => (
                    <div key={i} className={styles.artistRow}>
                      <div className={styles.artistRowName}>{entry.name}</div>
                      <div className={styles.artistRowTime}>
                        {`${entry.startHour}:${entry.startMin}-${entry.endHour}:${entry.endMin}(${entry.totalMin}min)`}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.separator} />
              </div>
            </div>

            {/* Logo */}
            <div className={styles.logoArea}>
              <ConfetiLogo />
            </div>
          </div>
        </div>

        {/* ── Right Panel: Timetable area ── */}
        <div className={styles.timetableArea}>
          <div
            className={styles.timetableContent}
            style={{ transform: `scaleY(${scaleFactor})` }}
          >
            {/* Stage header */}
            <div className={styles.stageHeader}>
              {boardData.stages.map((stage, idx) => (
                <Fragment key={stage.stageOrder}>
                  {idx > 0 && <div className={styles.stageHeaderSeparator} />}
                  <div className={styles.stageHeaderItem}>
                    {stage.stageName}
                  </div>
                </Fragment>
              ))}
            </div>

            {/* Time grid */}
            <div className={styles.timeGrid}>
              {/* Booth open box */}
              <div className={styles.boothOpenBox}>
                {'TICKET BOOTH OPEN '}
                {openHour}:{openMin}
              </div>

              {/* Time cells */}
              {tableRows.map((hour, index) => (
                <div key={hour} className={styles.hourCell}>
                  <span className={styles.timeLabel({ type: 'hour' })}>
                    {hour}
                  </span>
                  <hr className={styles.timeLine} />
                  {index !== tableRows.length - 1 && (
                    <span className={styles.timeLabel({ type: 'half' })}>
                      {HALF_HOUR_TO_MINUTES}
                    </span>
                  )}
                </div>
              ))}

              {/* Stages container with items */}
              <div className={styles.stagesContainer}>
                {boardData.stages.map((stage) => (
                  <div key={stage.stageOrder} className={styles.stageColumn}>
                    {stage.festivalTimes.map((block) => {
                      const [startHour, startMin] = parseTimeString(
                        block.startAt,
                      );
                      const [endHour, endMin] = parseTimeString(block.endAt);
                      const totalMin = calcTotalMinutes(
                        startHour,
                        startMin,
                        endHour,
                        endMin,
                      );
                      const fromOpen = calcMinutesFromOpen(
                        startHour,
                        startMin,
                        openHour,
                        openMin,
                      );

                      const top = `${fromOpen * MINUTE_HEIGHT_PX}px`;
                      const height = `${totalMin * MINUTE_HEIGHT_PX}px`;

                      return (
                        <div
                          key={block.timeBlockId}
                          className={styles.captureItem({
                            isSelected: block.isSelected,
                          })}
                          style={assignInlineVars({
                            [styles.itemTop]: top,
                            [styles.itemHeight]: height,
                          })}
                        >
                          <div
                            className={styles.artistName({
                              isSelected: block.isSelected,
                            })}
                          >
                            {block.artists.map((a) => a.artistName).join(', ')}
                          </div>
                          <div
                            className={styles.durationText({
                              isSelected: block.isSelected,
                            })}
                          >
                            {`${startHour}:${startMin}-${endHour}:${endMin}`}
                            {`(${totalMin}min)`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TimetableCapture.displayName = 'TimetableCapture';

export default TimetableCapture;
