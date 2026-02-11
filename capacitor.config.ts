import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fiscalexpress.app',
  appName: 'Fiscal Express',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'Fiscal Express',
  },
  plugins: {
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#0f172a',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
    Browser: {
      // Pentru deschiderea site-urilor externe
    },
  },
};

export default config;
