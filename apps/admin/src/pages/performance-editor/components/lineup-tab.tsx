import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Plus, Search, Trash2, X } from 'lucide-react';

import { ARTIST_QUERY_OPTIONS } from '@shared/apis/artist-queries';
import { Button, EmptyState, FormSection } from '@shared/components/common';
import { mapArtistSearchToFormArtist } from '@shared/models/artist';
import { formatDateShort } from '@shared/utils';
import { getArtistArtworkUrl } from '@shared/utils/artist-artwork';

import type { PerformanceArtist, PerformanceFormData } from '../types';

import * as styles from './lineup-tab.css';

interface LineupTabProps {
  formData: PerformanceFormData;
  handleAddStage: () => void;
  handleRemoveStage: (index: number) => void;
  handleStageChange: (index: number, value: string) => void;
  showArtistDropdown: boolean;
  setShowArtistDropdown: (show: boolean) => void;
  handleAddArtist: (artist: PerformanceArtist) => void;
  handleAddCustomArtist: () => void;
  handleRemoveArtist: (index: number) => void;
  handleArtistSearchChange: (value: string) => void;
  handleToggleArtistFestivalDate: (artistId: number, date: string) => void;
  setActiveTab: (tab: 'basic' | 'detail' | 'lineup' | 'timetable') => void;
  isConcert: boolean;
  daysArray: string[];
}

interface ArtistAvatarProps {
  artist: PerformanceArtist;
  className: string;
}

const ArtistAvatar = ({ artist, className }: ArtistAvatarProps) => {
  const artworkUrl = getArtistArtworkUrl(artist.artworkUrl);

  if (!artworkUrl) {
    return (
      <div className={className}>{artist.name.charAt(0).toUpperCase()}</div>
    );
  }

  return (
    <div className={className}>
      <img
        src={artworkUrl}
        alt={artist.name}
        className={styles.artistAvatarImage}
      />
    </div>
  );
};

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
  handleToggleArtistFestivalDate,
  setActiveTab,
  isConcert,
  daysArray,
}: LineupTabProps) => {
  const [debouncedSearch, setDebouncedSearch] = useState(formData.artistSearch);
  const artistSearchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearch(formData.artistSearch),
      300,
    );
    return () => clearTimeout(timer);
  }, [formData.artistSearch]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        artistSearchContainerRef.current &&
        !artistSearchContainerRef.current.contains(event.target as Node)
      ) {
        setShowArtistDropdown(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [setShowArtistDropdown]);

  const { data: artistSearchData } = useQuery(
    ARTIST_QUERY_OPTIONS.SEARCH(debouncedSearch),
  );

  const apiArtists =
    artistSearchData?.artists.map(mapArtistSearchToFormArtist) ?? [];
  const filteredArtists = apiArtists.filter(
    (artist) => !formData.artists.find((a) => a.id === artist.id),
  );

  return (
    <>
      {/* 스테이지 관리 */}
      {!isConcert && (
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
      )}

      {/* 아티스트 라인업 */}
      <FormSection title="아티스트 라인업">
        <div
          ref={artistSearchContainerRef}
          className={styles.artistSearchContainer}
        >
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
                    <ArtistAvatar
                      artist={artist}
                      className={styles.artistDropdownAvatar}
                    />
                    <span className={styles.artistDropdownName}>
                      {artist.name}
                    </span>
                    <Plus size={16} className={styles.artistDropdownIcon} />
                  </button>
                ))
              ) : (
                <div className={styles.artistDropdownEmpty}>
                  검색 결과가 없습니다.
                </div>
              )}
              <button
                onClick={handleAddCustomArtist}
                className={styles.artistDropdownCustom}
              >
                <span className={styles.artistDropdownCustomText}>
                  &apos;{formData.artistSearch}&apos; 직접 등록하기
                </span>
              </button>
            </div>
          )}
        </div>
        {!isConcert && daysArray.length === 0 && (
          <p className={styles.lineupGuideText}>
            기본 정보에서 공연 시작일과 종료일을 먼저 입력하면 아티스트별 출연
            일차를 선택할 수 있어요.
          </p>
        )}
        {!isConcert &&
          daysArray.length > 0 &&
          formData.artists.length === 0 && (
            <p className={styles.lineupGuideText}>
              아티스트를 추가한 뒤 카드에서 출연 일차를 선택해주세요.
            </p>
          )}
        <div className={styles.artistList}>
          {formData.artists.map((artist, index) => (
            <div key={artist.id} className={styles.artistCard}>
              <div className={styles.artistCardHeader}>
                <ArtistAvatar artist={artist} className={styles.artistAvatar} />
                <span className={styles.artistName}>{artist.name}</span>
                <button
                  onClick={() => handleRemoveArtist(index)}
                  className={styles.artistDeleteButton}
                >
                  <X size={16} />
                </button>
              </div>
              {!isConcert && daysArray.length > 0 && (
                <div className={styles.artistFestivalDateSection}>
                  <span className={styles.artistFestivalDateSectionLabel}>
                    출연 일차
                  </span>
                  <div className={styles.artistFestivalDateList}>
                    {daysArray.map((date, dateIndex) => {
                      const showSelectedFestivalDate =
                        artist.festivalDates?.includes(date) ?? false;

                      return (
                        <button
                          key={date}
                          type="button"
                          onClick={() =>
                            handleToggleArtistFestivalDate(artist.id, date)
                          }
                          className={
                            showSelectedFestivalDate
                              ? styles.artistFestivalDateButtonActive
                              : styles.artistFestivalDateButton
                          }
                        >
                          <span className={styles.artistFestivalDateLabel}>
                            DAY {dateIndex + 1}
                          </span>
                          <span className={styles.artistFestivalDateValue}>
                            {formatDateShort(date)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          {formData.artists.length === 0 && (
            <EmptyState title="추가된 아티스트가 없습니다." />
          )}
        </div>
      </FormSection>

      {/* 타임테이블 편집 이동 */}
      {!isConcert && (
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
      )}
    </>
  );
};
