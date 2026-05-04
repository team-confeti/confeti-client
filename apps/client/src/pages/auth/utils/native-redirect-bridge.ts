const NATIVE_STATE_PREFIX = 'native_';

/**
 * OAuth 콜백에서 받은 state가 native 시작 플로우인 경우 커스텀 스킴으로 핸드오프한다.
 * 핸드오프 발생 시 true 반환 — 호출자는 이후 로직을 스킵해야 한다.
 *
 * 웹 OAuth 흐름은 native_ prefix 없이 들어오므로 영향 받지 않는다.
 */
export const tryHandoffToNativeApp = (
  search: string,
  scheme: string,
): boolean => {
  const params = new URLSearchParams(search);
  const state = params.get('state');
  if (!state?.startsWith(NATIVE_STATE_PREFIX)) return false;
  if (typeof window !== 'undefined') {
    window.location.href = `${scheme}?${params.toString()}`;
  }
  return true;
};
