export const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('kakao-map-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error('카카오맵 스크립트 로드 실패'));

    document.head.appendChild(script);
  });
};
