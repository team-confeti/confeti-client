import { useEffect, useRef } from 'react';

import { geocodeByKakaoJS, loadKakaoMapScript } from '../../utils/kakao-map';

import * as styles from './map-view.css';

interface MapViewProps {
  address: string;
  onClick?: () => void;
}

const MapView = ({ address, onClick }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadKakaoMapScript();

        if (!window.kakao || !window.kakao.maps) return;

        window.kakao.maps.load(async () => {
          const container = mapRef.current;
          if (!container) return;

          const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(37.5665, 126.978),
            level: 3,
          });

          const dst = await geocodeByKakaoJS(address);
          if (!dst) return;

          const coords = new window.kakao.maps.LatLng(dst.lat, dst.lng);
          new window.kakao.maps.Marker({ map, position: coords });
          map.setCenter(coords);
        });
      } catch (error) {
        console.error('카카오맵 로딩 중 에러', error);
      }
    };

    initMap();
  }, [address]);

  return <div ref={mapRef} className={styles.map} onClick={onClick} />;
};

export default MapView;
