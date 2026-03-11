import { ArrowRight, Plus, Search, Trash2, X } from 'lucide-react';

import { Button, EmptyState, FormSection } from '@shared/components/common';
import { ARTISTS } from '@shared/mocks';

import type { EventFormData } from '../types';

import * as styles from './lineup-tab.css';

interface LineupTabProps {
  formData: EventFormData;
  handleAddStage: () => void;
  handleRemoveStage: (index: number) => void;
  handleStageChange: (index: number, value: string) => void;
  showArtistDropdown: boolean;
  setShowArtistDropdown: (show: boolean) => void;
  handleAddArtist: (artist: { id: number; name: string }) => void;
  handleAddCustomArtist: () => void;
  handleRemoveArtist: (index: number) => void;
  handleArtistSearchChange: (value: string) => void;
  setActiveTab: (tab: 'basic' | 'detail' | 'lineup' | 'timetable') => void;
}

export const LineupTab = ({
  formData,
  handleAddStage,
  handleRemoveStage,
  handleStageChange,
  showArtistDropdown,
  setShowArtistDropdown,
  handleAddArtist,
  handleAddCustomArtist,
  handleRemoveArtist,
  handleArtistSearchChange,
  setActiveTab,
}: LineupTabProps) => {
  // 검색어로 필터링된 아티스트 목록 (이미 추가된 아티스트 제외)
  const filteredArtists = ARTISTS.filter((artist) => {
    const searchLower = formData.artistSearch.toLowerCase();
    const isNotAdded = !formData.artists.find((a) => a.id === artist.id);
    const matchesSearch = artist.name.toLowerCase().includes(searchLower);
    return isNotAdded && matchesSearch;
  });

  return (
    <>
      {/* 스테이지 관리 */}
      <FormSection
        title="스테이지 관리"
        description="페스티벌에서 운영되는 스테이지를 정의합니다. 타임테이블에서 사용됩니다."
      >
        <div className={styles.stageList}>
          {formData.stages.map((stage, index) => (
            <div key={index} className={styles.stageRow}>
              <div className={styles.stageNumber}>{index + 1}</div>
              <input
                type="text"
                value={stage.name}
                onChange={(e) => handleStageChange(index, e.target.value)}
                placeholder="스테이지 이름"
                className={styles.stageInput}
              />
              <button
                onClick={() => handleRemoveStage(index)}
                className={styles.stageDeleteButton}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <Button
          onClick={handleAddStage}
          variant="secondary"
          size="medium"
          leftIcon={<Plus size={16} />}
          className={styles.addButton}
        >
          스테이지 추가
        </Button>
      </FormSection>

      {/* 아티스트 라인업 */}
      <FormSection title="아티스트 라인업">
        <div className={styles.artistSearchContainer}>
          <div className={styles.artistSearchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              value={formData.artistSearch}
              onChange={(e) => handleArtistSearchChange(e.target.value)}
              onFocus={() =>
                formData.artistSearch && setShowArtistDropdown(true)
              }
              placeholder="아티스트 이름을 검색하세요"
              className={styles.artistSearchInput}
            />
          </div>
          {showArtistDropdown && formData.artistSearch && (
            <div className={styles.artistDropdown}>
              {filteredArtists.length > 0 ? (
                filteredArtists.slice(0, 10).map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => handleAddArtist(artist)}
                    className={styles.artistDropdownItem}
                  >
                    <div className={styles.artistDropdownAvatar}>
                      {artist.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={styles.artistDropdownName}>
                      {artist.name}
                    </span>
                    <Plus size={16} className={styles.artistDropdownIcon} />
                  </button>
                ))
              ) : (
                <>
                  <div className={styles.artistDropdownEmpty}>
                    검색 결과가 없습니다.
                  </div>
                  <button
                    onClick={handleAddCustomArtist}
                    className={styles.artistDropdownCustom}
                  >
                    <span className={styles.artistDropdownCustomText}>
                      &apos;{formData.artistSearch}&apos; 직접 등록하기
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className={styles.artistList}>
          {formData.artists.map((artist, index) => (
            <div key={index} className={styles.artistCard}>
              <div className={styles.artistAvatar}>
                {artist.name.charAt(0).toUpperCase()}
              </div>
              <span className={styles.artistName}>{artist.name}</span>
              <button
                onClick={() => handleRemoveArtist(index)}
                className={styles.artistDeleteButton}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {formData.artists.length === 0 && (
            <EmptyState title="추가된 아티스트가 없습니다." />
          )}
        </div>
      </FormSection>

      {/* 타임테이블 편집 이동 */}
      <div className={styles.timetableNavigation}>
        <Button
          onClick={() => setActiveTab('timetable')}
          variant="primary"
          size="large"
          rightIcon={<ArrowRight size={18} />}
          className={styles.timetableNavigationButton}
        >
          타임테이블 편집으로 이동
        </Button>
      </div>
    </>
  );
};
