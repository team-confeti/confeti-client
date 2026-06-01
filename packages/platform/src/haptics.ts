import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

import { isNative } from './runtime';

type ImpactStrength = 'light' | 'medium' | 'heavy';
type NotifyType = 'success' | 'warning' | 'error';

const IMPACT_STYLE: Record<ImpactStrength, ImpactStyle> = {
  light: ImpactStyle.Light,
  medium: ImpactStyle.Medium,
  heavy: ImpactStyle.Heavy,
};

const NOTIFY_TYPE: Record<NotifyType, NotificationType> = {
  success: NotificationType.Success,
  warning: NotificationType.Warning,
  error: NotificationType.Error,
};

async function run(action: () => Promise<unknown>): Promise<void> {
  if (!isNative()) return;
  try {
    await action();
  } catch {
    // 햅틱 미지원 기기/환경은 무시한다.
  }
}

export const hapticImpact = (
  strength: ImpactStrength = 'light',
): Promise<void> =>
  run(() => Haptics.impact({ style: IMPACT_STYLE[strength] }));

export const hapticSelection = (): Promise<void> =>
  run(() => Haptics.selectionChanged());

export const hapticNotify = (type: NotifyType): Promise<void> =>
  run(() => Haptics.notification({ type: NOTIFY_TYPE[type] }));
