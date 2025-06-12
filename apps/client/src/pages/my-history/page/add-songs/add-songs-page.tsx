import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ConfirmAddSection from '@pages/my-history/page/add-songs/confirm-add-section';
import RelatedArtistList from '@pages/my-history/page/add-songs/related-artist-list';
import { useQuery } from '@tanstack/react-query';

import { Button, SearchBar, toast } from '@confeti/design-system';
import { SETLIST_QUERY_OPTION } from '@shared/apis/my-history/setlist-queries';
import MusicList from '@shared/components/music-list/music-list';
import { SwitchCase } from '@shared/components/switch-case';
import { useRelatedSearch } from '@shared/hooks/queries/use-related-search-queries';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import { useKeyboard } from '@shared/hooks/use-keyboard';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import Loading from '@shared/pages/loading/loading';
import { MusicInfoResponse } from '@shared/types/my-history-response';
import { RelatedArtist } from '@shared/types/search-response';

import * as styles from './add-songs-page.css';

const AddSongsPage = () => {
  const [searchParams] = useSearchParams();
  const { setlistId } = useParams<{ setlistId: string }>();
  const paramsKeyword = searchParams.get('q') || '';

  const { keyword, debouncedKeyword, handleInputChange } =
    useDebouncedKeyword(paramsKeyword);

  const [isConfirmAddSection, setIsConfirmAddSection] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<MusicInfoResponse[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [isArtistSearch, setIsArtistSearch] = useState(false);
  const [shouldShowResult, setShouldShowResult] = useState(false);
  const navigate = useNavigate();

  const {
    data: { relatedArtists },
    isLoading: isRelatedSearchLoading,
  } = useRelatedSearch({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const isArtistKeywordClick = !!selectedArtistId && isArtistSearch;
  const isTypedSearch = !!debouncedKeyword.trim() && !isArtistSearch;
  // 일반 검색: 곡 검색 API
  const { data: musicSearchData } = useQuery({
    ...SETLIST_QUERY_OPTION.SEARCH_MUSIC(
      { term: debouncedKeyword, offset: 0, limit: 5 },
      isTypedSearch,
    ),
  });

  // 아티스트 검색: 아티스트 곡 검색 API
  const { data: artistSearchData } = useQuery({
    ...SETLIST_QUERY_OPTION.SEARCH_ARTIST_MUSIC(
      {
        aid: isArtistKeywordClick ? selectedArtistId! : '',
        term: isTypedSearch ? debouncedKeyword : '',
        offset: 0,
        limit: 5,
      },
      isArtistKeywordClick || isTypedSearch,
    ),
  });

  const combinedMusics = isArtistKeywordClick
    ? artistSearchData?.musics || []
    : [...(musicSearchData?.musics || []), ...(artistSearchData?.musics || [])];
  const { musicList, onClickPlayToggle, audioRef } =
    useMusicPlayer(combinedMusics);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === 'Enter') {
        // 엔터키로 직접 검색 시
        setIsArtistSearch(false);
        setSelectedArtistId(null);
        setShouldShowResult(true);
      }
    },
  });

  // 검색어 변경 시 상태 초기화
  useEffect(() => {
    if (!debouncedKeyword.trim()) {
      setSelectedArtistId(null);
      setIsArtistSearch(false);
      setShouldShowResult(false);
    } else {
      // 새로운 검색어 입력 시 결과 화면 숨기고 suggestion 표시
      setShouldShowResult(false);
    }
  }, [debouncedKeyword]);

  const handleMoveToConfirmAddSection = () => setIsConfirmAddSection(true);

  const handleRemoveSong = (musicId: string) => {
    setSelectedSongs((prev) => prev.filter((song) => song.musicId !== musicId));
  };

  const selectedArtist = relatedArtists?.artists.find(
    (artist: RelatedArtist) => artist.name === paramsKeyword,
  );
  const handleConfirmAddSection = () => setIsConfirmAddSection(false);

  const handleSelectArtist = (artistKeyword: string) => {
    // 연관 검색어에서 선택된 아티스트 정보 찾기

    if (selectedArtist) {
      setSelectedArtistId(selectedArtist.artistId);
      setIsArtistSearch(true);
    }
    navigate(`/my-history/setlist/${setlistId}/add-songs?q=${artistKeyword}`);
  };

  const handleClickMusic = (musicId: string) => {
    const song = musicList.find((m) => m.musicId === musicId);
    if (!song) return;

    const isAlreadySelected = selectedSongs.some(
      (s) => s.musicId === song.musicId,
    );

    if (!isAlreadySelected) {
      const newSong = {
        musicId: song.musicId,
        trackName: song.trackName,
        artistName: song.artistName,
        artworkUrl: song.artworkUrl,
        previewUrl: song.previewUrl,
      };

      setSelectedSongs((prev) => [...prev, newSong]);
      toast({
        text: '(이)가 대기열에 추가되었습니다.',
        highlightText: song.trackName,
        position: 'middleCenter',
      });
    }
  };

  useEffect(() => {
    if (!paramsKeyword.trim()) return;

    if (selectedArtist) {
      setSelectedArtistId(selectedArtist.artistId);
      setIsArtistSearch(true);
      setShouldShowResult(true);
    }
  }, [paramsKeyword, relatedArtists]);

  const SuggestionContent = () => {
    return (
      <div className={styles.suggestionContainer}>
        {relatedArtists?.artists.map((artist: RelatedArtist) => (
          <RelatedArtistList
            onSelect={() => handleSelectArtist(artist.name)}
            key={artist.artistId}
            artist={artist}
          />
        ))}
      </div>
    );
  };

  const GeneralResult = () => {
    return (
      <>
        <div className={styles.renderContentContainer}>
          <MusicList
            musics={musicList}
            onClickPlayToggle={onClickPlayToggle}
            onClickAdd={handleClickMusic}
            variant="default"
          />
          <audio ref={audioRef} />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            text="선택 완료"
            disabled={selectedSongs.length === 0}
            onClick={handleMoveToConfirmAddSection}
          />
        </div>
      </>
    );
  };

  const RelatedResult = () => {
    return (
      <>
        <p className={styles.selectedComment}>
          현재 선택된 아티스트의 곡이에요.
        </p>
        <div className={styles.listContainer}>
          {selectedArtist && <RelatedArtistList artist={selectedArtist} />}
        </div>
        <div className={styles.renderContentContainer}>
          <MusicList
            musics={musicList}
            onClickPlayToggle={onClickPlayToggle}
            onClickAdd={handleClickMusic}
            variant="default"
          />
          <audio ref={audioRef} />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            text="선택 완료"
            disabled={selectedSongs.length === 0}
            onClick={handleMoveToConfirmAddSection}
          />
        </div>
      </>
    );
  };

  // 검색 결과 컴포넌트 분기
  const ResultContent = () => {
    return isArtistSearch ? <RelatedResult /> : <GeneralResult />;
  };

  const hasSuggestions = (relatedArtists?.artists?.length ?? 0) > 0;
  const hasKeyword = !!keyword.trim();
  // 검색 상태 로직 개선
  const searchState = isRelatedSearchLoading
    ? 'loading'
    : shouldShowResult
      ? 'result'
      : hasKeyword && hasSuggestions
        ? 'suggestion'
        : 'default';

  return (
    <>
      {isConfirmAddSection ? (
        <ConfirmAddSection
          selectedSongs={selectedSongs}
          handleRemoveSong={handleRemoveSong}
          handleConfirmAddSection={handleConfirmAddSection}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.searchBarContainer}>
            <SearchBar
              placeholder="노래 제목 또는 아티스트를 검색해주세요."
              value={keyword}
              onChange={handleInputChange}
              {...keyboardProps}
            />
          </div>
          <SwitchCase
            value={searchState}
            caseBy={{
              loading: () => <Loading />,
              result: () => <ResultContent />,
              suggestion: () => <SuggestionContent />,
            }}
            defaultComponent={() => null}
          />
        </div>
      )}
    </>
  );
};

export default AddSongsPage;
