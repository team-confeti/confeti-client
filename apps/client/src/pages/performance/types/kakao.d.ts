export {};

declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  interface KakaoNamespace {
    maps: {
      load: (callback: () => void) => void;
      LatLng: new (lat: number, lng: number) => kakao.maps.LatLng;
      Map: new (
        container: HTMLElement,
        options: kakao.maps.MapOptions,
      ) => kakao.maps.Map;
      Marker: new (options: kakao.maps.MarkerOptions) => kakao.maps.Marker;
      services: {
        Geocoder: new () => {
          addressSearch(
            address: string,
            callback: (
              result: kakao.maps.services.GeocoderResult[],
              status: kakao.maps.services.Status,
            ) => void,
          ): void;
        };
        Status: {
          OK: kakao.maps.services.Status;
          ZERO_RESULT: kakao.maps.services.Status;
          ERROR: kakao.maps.services.Status;
        };
      };
    };
  }

  namespace kakao.maps {
    interface LatLng {
      getLat(): number;
      getLng(): number;
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    interface Map {
      setCenter(latlng: LatLng): void;
    }

    interface MarkerOptions {
      map: Map;
      position: LatLng;
    }

    interface Marker {
      setMap(map: Map | null): void;
      getPosition(): LatLng;
    }

    namespace services {
      type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';

      interface GeocoderResult {
        address: {
          address_name: string;
        };
        road_address: {
          address_name: string;
        } | null;
        x: string;
        y: string;
      }
    }
  }
}
