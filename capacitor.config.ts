import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.josexs.ct',
    appName: 'CarsTournaments',
    webDir: 'www',
    bundledWebRuntime: false,
    plugins: {
        CapacitorUpdater: {
            autoUpdate: true,
            autoUpdateUrl:
                'https://carstournaments.carsites.es/api/ota/getOtaAvailable/',
        },
        PushNotifications: {
            presentationOptions: ['badge', 'sound', 'alert'],
        },
    },
};

export default config;
