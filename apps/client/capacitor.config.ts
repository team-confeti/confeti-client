import type { CapacitorConfig } from '@capacitor/cli';

const isDev = process.env.CAP_DEV === '1';

const REMOTE_URL = 'https://www.confeti.co.kr';

const config: CapacitorConfig = {
  appId: 'com.confeti.app',
  appName: 'confeti',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    // CAP_DEV=1 → 로컬 dev 서버 (hot-reload). 그 외 → prod 셸 모드.
    url: isDev ? 'http://localhost:5173' : REMOTE_URL,
    ...(isDev ? { cleartext: true } : {}),
  },
  ios: {
    contentInset: 'never',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#FFFFFF',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
