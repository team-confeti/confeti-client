import { Preferences } from '@capacitor/preferences';

import { isNative } from '../runtime';

const ACCESS_KEY = 'CONFETI_ACCESS_TOKEN';
const REFRESH_KEY = 'CONFETI_REFRESH_TOKEN';

let memoryCache: { access?: string; refresh?: string } = {};
let initialized = false;

export async function initTokenStore(): Promise<void> {
  if (!isNative()) {
    initialized = true;
    return;
  }
  const [a, r] = await Promise.all([
    Preferences.get({ key: ACCESS_KEY }),
    Preferences.get({ key: REFRESH_KEY }),
  ]);
  memoryCache = {
    access: a.value ?? undefined,
    refresh: r.value ?? undefined,
  };
  initialized = true;
}

export function isTokenStoreInitialized(): boolean {
  return initialized;
}

export function getAccessTokenNative(): string | undefined {
  return memoryCache.access;
}

export function getRefreshTokenNative(): string | undefined {
  return memoryCache.refresh;
}

export function setTokensNative(access?: string, refresh?: string): void {
  if (access !== undefined) {
    memoryCache.access = access;
    void Preferences.set({ key: ACCESS_KEY, value: access });
  }
  if (refresh !== undefined) {
    memoryCache.refresh = refresh;
    void Preferences.set({ key: REFRESH_KEY, value: refresh });
  }
}

export function removeTokensNative(): void {
  memoryCache = {};
  void Preferences.remove({ key: ACCESS_KEY });
  void Preferences.remove({ key: REFRESH_KEY });
}
