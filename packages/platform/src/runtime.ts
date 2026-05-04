import { Capacitor } from '@capacitor/core';

export type Platform = 'web' | 'ios' | 'android';

export const isNative = (): boolean => Capacitor.isNativePlatform();

export const getPlatform = (): Platform => Capacitor.getPlatform() as Platform;

export const isIOS = (): boolean => getPlatform() === 'ios';

export const isAndroid = (): boolean => getPlatform() === 'android';
