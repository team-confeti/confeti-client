import { Calendar, Check, Link2, Plus, Trash2 } from 'lucide-react';

import {
  Button,
  EmptyState,
  FormSection,
  Input,
} from '@shared/components/common';
import type { TicketVendorResponse } from '@shared/types/api';

import type { PerformanceFormData } from '../types';

import * as styles from './basic-info-tab.css';

interface BasicInfoTabProps {
  formData: PerformanceFormData;
  ticketVendors: TicketVendorResponse[];
  showScheduleSyncButton: boolean;
  handleInputChange: (field: string, value: string | number) => void;
  handleAddBookingSchedule: () => void;
  handleRemoveBookingSchedule: (index: number) => void;
  handleBookingScheduleChange: (
    index: number,
    field: 'round' | 'startDate',
    value: string,
  ) => void;
  handleToggleTicketingPlatform: (
    ticketingPlatformId: number,
    ticketingPlatformName: string,
  ) => void;
  handleRemoveTicketingPlatform: (ticketingPlatformId: number) => void;
  handleTicketingPlatformChange: (
    ticketingPlatformId: number,
    field: 'url' | 'datetime',
    value: string,
  ) => void;
  scheduleSynced: boolean;
  handleSyncSchedule: () => void;
}

export const BasicInfoTab = ({
  formData,
  ticketVendors,
  showScheduleSyncButton,
  handleInputChange,
  handleAddBookingSchedule,
  handleRemoveBookingSchedule,
  handleBookingScheduleChange,
  handleToggleTicketingPlatform,
  handleRemoveTicketingPlatform,
  handleTicketingPlatformChange,
  scheduleSynced,
  handleSyncSchedule,
}: BasicInfoTabProps) => {
  return (
    <>
      {/* 공연 분류 */}
      <FormSection title="공연 분류">
        <div className={styles.radioGroup}>
          <label
            className={
              formData.type === 'Festival'
                ? styles.radioCardActive
                : styles.radioCard
            }
          >
            <input
              type="radio"
              name="type"
              value="Festival"
              checked={formData.type === 'Festival'}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className={styles.radioInput}
            />
            <div className={styles.radioContent}>
              <span className={styles.radioLabel}>페스티벌</span>
              <p className={styles.radioDescription}>
                여러 스테이지, 타임테이블 존재
              </p>
            </div>
          </label>
          <label
            className={
              formData.type === 'Concert'
                ? styles.radioCardActive
                : styles.radioCard
            }
          >
            <input
              type="radio"
              name="type"
              value="Concert"
              checked={formData.type === 'Concert'}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className={styles.radioInput}
            />
            <div className={styles.radioContent}>
              <span className={styles.radioLabel}>콘서트</span>
              <p className={styles.radioDescription}>
                단일 공연 및 순수 아티스트
              </p>
            </div>
          </label>
        </div>
      </FormSection>

      {/* 공연 기본 정보 */}
      <FormSection title="공연 기본 정보">
        <Input
          label="공연명"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="예. 2025 부산국제락페스티벌"
        />
      </FormSection>

      {/* 일정 및 관람 제한 */}
      <FormSection title="일정 및 관람 제한">
        <div className={styles.formRow}>
          <Input
            label="시작일"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            leftIcon={<Calendar size={14} />}
          />
          <Input
            label="종료일"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            leftIcon={<Calendar size={14} />}
          />
        </div>
        <div className={styles.formRow}>
          <Input
            label="관람등급"
            value={formData.ageRating}
            onChange={(e) => handleInputChange('ageRating', e.target.value)}
            placeholder="예. 전체 관람가, 15세 이상"
          />
          <Input
            label="러닝 타임"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={
              formData.durationMinutes > 0
                ? String(formData.durationMinutes)
                : ''
            }
            onChange={(e) =>
              handleInputChange(
                'durationMinutes',
                Number(e.target.value.replace(/\D/g, '') || 0),
              )
            }
            placeholder="120"
          />
        </div>
        {showScheduleSyncButton && (
          <Button
            onClick={handleSyncSchedule}
            variant="primary"
            size="medium"
            leftIcon={
              scheduleSynced ? <Check size={16} /> : <Calendar size={16} />
            }
            className={styles.syncScheduleButton}
          >
            {scheduleSynced ? '반영 완료!' : '타임테이블에 일정 반영'}
          </Button>
        )}
      </FormSection>

      {/* 공연 예매 일정 */}
      <FormSection title="공연 예매 일정">
        <div className={styles.bookingHeader}>
          <span className={styles.bookingHeaderLabel}>
            예매 차수별 일정 설정
          </span>
        </div>
        {formData.bookingSchedules.map((schedule, index) => (
          <div key={index} className={styles.bookingCard}>
            <div className={styles.bookingCardContent}>
              <div className={styles.bookingInputGroup}>
                <Input
                  label="예매 차수"
                  value={schedule.round}
                  onChange={(e) =>
                    handleBookingScheduleChange(index, 'round', e.target.value)
                  }
                  placeholder="1차 예매"
                />
              </div>
              <div className={styles.bookingInputGroup}>
                <Input
                  label="예매 시작"
                  type="datetime-local"
                  value={schedule.startDate}
                  onChange={(e) =>
                    handleBookingScheduleChange(
                      index,
                      'startDate',
                      e.target.value,
                    )
                  }
                  placeholder="시작일"
                  leftIcon={<Calendar size={14} />}
                />
              </div>
              <button
                onClick={() => handleRemoveBookingSchedule(index)}
                className={styles.deleteIconButton}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        <Button
          onClick={handleAddBookingSchedule}
          variant="secondary"
          size="medium"
          leftIcon={<Plus size={16} />}
          className={styles.addButton}
        >
          예매 일정 추가
        </Button>
      </FormSection>

      {/* 예매처 정보 */}
      <FormSection title="예매처 정보">
        <div className={styles.ticketingPlatformHeader}>
          <span className={styles.ticketingPlatformHeaderLabel}>
            예매처 선택 및 URL 입력
          </span>
        </div>
        <div className={styles.ticketingPlatformPillList}>
          {ticketVendors.map((platform) => (
            <button
              key={platform.id}
              onClick={() =>
                handleToggleTicketingPlatform(platform.id, platform.name)
              }
              className={
                formData.selectedTicketingPlatforms.find(
                  (a) => a.id === platform.id,
                )
                  ? styles.ticketingPlatformPillActive
                  : styles.ticketingPlatformPill
              }
            >
              <img
                src={platform.logoPath}
                alt={platform.name}
                className={styles.ticketingPlatformIcon}
              />
              {platform.name}
              <Plus size={16} />
            </button>
          ))}
        </div>
        {formData.selectedTicketingPlatforms.map((platform) => (
          <div key={platform.id} className={styles.ticketingPlatformCard}>
            <div className={styles.ticketingPlatformCardHeader}>
              <img
                src={ticketVendors.find((v) => v.id === platform.id)?.logoPath}
                alt={platform.name}
                className={styles.ticketingPlatformLogo}
              />
              <span className={styles.ticketingPlatformName}>
                {platform.name}
              </span>
            </div>
            <div className={styles.ticketingPlatformCardContent}>
              <div className={styles.ticketingPlatformUrlInput}>
                <Link2 size={16} className={styles.linkIcon} />
                <input
                  type="text"
                  value={platform.url}
                  onChange={(e) =>
                    handleTicketingPlatformChange(
                      platform.id,
                      'url',
                      e.target.value,
                    )
                  }
                  placeholder="예매 페이지 URL을 입력하세요"
                  className={styles.ticketingPlatformInput}
                />
              </div>
              <div className={styles.ticketingPlatformDatetimeInput}>
                <input
                  type="datetime-local"
                  value={platform.datetime}
                  onChange={(e) =>
                    handleTicketingPlatformChange(
                      platform.id,
                      'datetime',
                      e.target.value,
                    )
                  }
                  className={styles.ticketingPlatformDatetimeInputField}
                />
              </div>
              <button
                onClick={() => handleRemoveTicketingPlatform(platform.id)}
                className={styles.ticketingPlatformDeleteButton}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {formData.selectedTicketingPlatforms.length === 0 && (
          <EmptyState
            title="등록된 예매처가 없습니다."
            description="상단의 버튼을 눌러 예매처를 추가해주세요."
          />
        )}
      </FormSection>
    </>
  );
};
