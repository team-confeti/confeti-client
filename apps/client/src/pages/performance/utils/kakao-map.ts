import { ENV_CONFIG } from '@shared/constants/config';

type Transport = 'car' | 'publictransit' | 'foot' | 'bicycle';
type Coords = { lat: number; lng: number };

interface OpenRouteByAddressOptions {
  address: string;
  name?: string;
  by?: Transport;
  useCurrentAsStart?: boolean;
}

type GeocodeHit = { lat: number; lng: number; label: string };

// Loader
export const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('kakao-map-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${ENV_CONFIG.KAKAO_JS_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error('카카오맵 스크립트 로드 실패'));

    document.head.appendChild(script);
  });
};

// Helpers
async function getCurrentPosition(): Promise<Coords | null> {
  if (!('geolocation' in navigator)) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 5000 },
    );
  });
}

// Geocode
export async function geocodeByKakaoJS(
  address: string,
): Promise<GeocodeHit | null> {
  const w = window as Window & { kakao?: KakaoNamespace };
  if (!w.kakao?.maps?.services) return null;

  return new Promise((resolve) => {
    const geocoder = new w.kakao!.maps.services.Geocoder();
    geocoder.addressSearch(
      address,
      (
        results: kakao.maps.services.GeocoderResult[],
        status: kakao.maps.services.Status,
      ) => {
        if (status === w.kakao!.maps.services.Status.OK && results?.length) {
          const result = results[0];
          const roadAddress = result.road_address?.address_name?.trim();
          const streetAddress = result.address?.address_name?.trim();
          const label = roadAddress || streetAddress || address.trim();

          resolve({
            lat: parseFloat(result.y),
            lng: parseFloat(result.x),
            label,
          });
        } else {
          resolve(null);
        }
      },
    );
  });
}

// WebLink
function openKakaoWebTo(destination: Coords, label: string) {
  const title = encodeURIComponent(label);
  const url = `https://map.kakao.com/link/to/${title},${destination.lat},${destination.lng}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Route
export async function openKakaoRoute({
  address,
  by = 'publictransit',
  useCurrentAsStart = true,
}: OpenRouteByAddressOptions) {
  const trimmedAddress = address.trim();

  const destination = await geocodeByKakaoJS(trimmedAddress);
  if (!destination) {
    const fallbackUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
      trimmedAddress,
    )}`;
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isMobile = isAndroid || isIOS;

  const startPoint = useCurrentAsStart ? await getCurrentPosition() : null;

  const params = new URLSearchParams();
  if (startPoint) {
    params.set('sp', `${startPoint.lat},${startPoint.lng}`);
    params.set('startLoc', '현재 위치');
  }
  params.set('ep', `${destination.lat},${destination.lng}`);
  params.set('by', by);
  params.set('endLoc', destination.label);

  const query = params.toString();

  const mobileWebUrl = `https://m.map.kakao.com/scheme/route?${query}`;

  if (!isMobile) {
    openKakaoWebTo(destination, destination.label);
    return;
  }

  if (isAndroid) {
    const intentUrl =
      `intent://route?${query}#Intent;` +
      `scheme=kakaomap;package=net.daum.android.map;` +
      `S.browser_fallback_url=${encodeURIComponent(mobileWebUrl)};end`;
    window.location.href = intentUrl;
    return;
  }

  if (isIOS) {
    const appUrl = `kakaomap://route?${query}`;
    const start = Date.now();
    window.location.href = appUrl;
    setTimeout(() => {
      if (Date.now() - start < 1200) {
        window.location.href = mobileWebUrl;
      }
    }, 900);
  }
}
