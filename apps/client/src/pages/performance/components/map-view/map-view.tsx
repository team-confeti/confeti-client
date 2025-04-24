import { useEffect, useRef } from 'react';

import * as styles from './map-view.css';

interface MapViewProps {
  address: string;
}

const MapView = ({ address }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const container = mapRef.current;
    if (!container) return;

    const map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    });

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (
        status === window.kakao.maps.services.Status.OK &&
        result.length > 0
      ) {
        const { x, y } = result[0];
        const coords = new window.kakao.maps.LatLng(
          parseFloat(y),
          parseFloat(x),
        );
        new window.kakao.maps.Marker({ map, position: coords });
        map.setCenter(coords);
      }
    });
  }, [address]);

  return <div ref={mapRef} className={styles.map} />;
};

export default MapView;
