import { CircleDollarSign, MapPin, Plus, Trash2, Upload } from 'lucide-react';

import { Button, FormSection, Input } from '@shared/components/common';

import type { PerformanceFormData } from '../types';

import * as styles from './detail-info-tab.css';

interface DetailInfoTabProps {
  formData: PerformanceFormData;
  handleInputChange: (field: string, value: string | number) => void;
  handleAddPriceGrade: () => void;
  handleRemovePriceGrade: (index: number) => void;
  handlePriceGradeChange: (
    index: number,
    field: 'grade' | 'price',
    value: string,
  ) => void;
  handleFileChange: (
    field: 'mainPoster' | 'logo',
    file: File | null,
  ) => Promise<void>;
}

export const DetailInfoTab = ({
  formData,
  handleInputChange,
  handleAddPriceGrade,
  handleRemovePriceGrade,
  handlePriceGradeChange,
  handleFileChange,
}: DetailInfoTabProps) => {
  const formatPrice = (price: string) => {
    const numericPrice = price.replace(/\D/g, '');

    if (!numericPrice) {
      return '';
    }

    return `${Number(numericPrice).toLocaleString('ko-KR')}원`;
  };

  return (
    <>
      <div className={styles.twoColumnRow}>
        {/* 장소 정보 */}
        <FormSection title="장소 정보">
          <Input
            label="장소명"
            value={formData.venueName}
            onChange={(e) => handleInputChange('venueName', e.target.value)}
            placeholder="예: 삼락생태공원"
            leftIcon={<MapPin size={14} />}
          />
          <Input
            label="주소"
            value={formData.venueAddress}
            onChange={(e) => handleInputChange('venueAddress', e.target.value)}
            placeholder="상세 주소를 입력하세요"
          />
        </FormSection>

        {/* 티켓 가격 */}
        <FormSection title="티켓 가격">
          <div className={styles.priceHeader}>
            <span className={styles.priceHeaderLabel}>좌석 등급 및 가격</span>
          </div>
          {formData.priceGrades.map((grade, index) => (
            <div key={index} className={styles.priceCard}>
              <input
                type="text"
                value={grade.grade}
                onChange={(e) =>
                  handlePriceGradeChange(index, 'grade', e.target.value)
                }
                placeholder="일반석"
                className={styles.priceGradeInput}
              />
              <div className={styles.priceInputWrapper}>
                <CircleDollarSign size={14} className={styles.priceIcon} />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formatPrice(grade.price).replace(/원$/, '')}
                  onChange={(e) =>
                    handlePriceGradeChange(
                      index,
                      'price',
                      e.target.value.replace(/\D/g, ''),
                    )
                  }
                  placeholder="18,000"
                  className={styles.priceInput}
                />
                <span className={styles.priceSuffix}>원</span>
              </div>
              <button
                onClick={() => handleRemovePriceGrade(index)}
                className={styles.deleteIconButton}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <Button
            onClick={handleAddPriceGrade}
            variant="secondary"
            size="medium"
            leftIcon={<Plus size={14} />}
            className={styles.addButton}
          >
            가격 등급 추가
          </Button>
        </FormSection>
      </div>

      {/* 이미지 및 포스터 */}
      <FormSection title="이미지 및 포스터">
        <div className={styles.uploadGrid}>
          <label
            className={
              formData.mainPosterPreview
                ? styles.uploadBoxWithImage
                : styles.uploadBox
            }
          >
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) =>
                handleFileChange('mainPoster', e.target.files?.[0] || null)
              }
              className={styles.fileInput}
            />
            {formData.mainPosterPreview ? (
              <img
                src={formData.mainPosterPreview}
                alt="포스터 미리보기"
                className={styles.previewImage}
              />
            ) : (
              <>
                <Upload size={48} className={styles.uploadIcon} />
                <span className={styles.uploadTitle}>메인 포스터 업로드</span>
                <div className={styles.uploadDescription}>
                  <p>권장 사이즈: 1200x1600px</p>
                  <p>JPG 또는 PNG</p>
                </div>
              </>
            )}
          </label>
          <label
            className={
              formData.logoPreview
                ? styles.uploadBoxSmallWithImage
                : styles.uploadBoxSmall
            }
          >
            <input
              type="file"
              accept="image/png"
              onChange={(e) =>
                handleFileChange('logo', e.target.files?.[0] || null)
              }
              className={styles.fileInput}
            />
            {formData.logoPreview ? (
              <img
                src={formData.logoPreview}
                alt="로고 미리보기"
                className={styles.previewImageSmall}
              />
            ) : (
              <>
                <Upload size={48} className={styles.uploadIcon} />
                <span className={styles.uploadTitle}>로고 업로드</span>
                <p className={styles.uploadDescriptionSingle}>
                  배경 투명 PNG 권장
                </p>
              </>
            )}
          </label>
        </div>
      </FormSection>
    </>
  );
};
