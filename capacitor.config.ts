import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.rentsafe.escrow",
  appName: "RentSafe",
  server: {
    url: "https://escrow-frontend-eta.vercel.app",
  },
  android: {
    // Configuración específica de Android aquí
    allowMixedContent: true,
    webContentsDebuggingEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: "#000000",
      style: "light",
    },
  },
};

export default config;
