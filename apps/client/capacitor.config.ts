import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.confeti.app',
  appName: 'Confeti',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    Geolocation: {
      permissions: ['location'],
    },
  },
};

export default config;
