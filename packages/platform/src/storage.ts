import { Preferences } from '@capacitor/preferences';

import { isNative } from './runtime';

export interface PlatformStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

const webStorage: PlatformStorage = {
  async getItem(key) {
    return localStorage.getItem(key);
  },
  async setItem(key, value) {
    localStorage.setItem(key, value);
  },
  async removeItem(key) {
    localStorage.removeItem(key);
  },
};

const nativeStorage: PlatformStorage = {
  async getItem(key) {
    const result = await Preferences.get({ key });
    return result.value;
  },
  async setItem(key, value) {
    await Preferences.set({ key, value });
  },
  async removeItem(key) {
    await Preferences.remove({ key });
  },
};

export const storage: PlatformStorage = isNative() ? nativeStorage : webStorage;
