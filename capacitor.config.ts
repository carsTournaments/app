import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.josexs.ct',
    appName: 'CarsTournaments',
    webDir: 'www',
    bundledWebRuntime: false,
    plugins: {
        PushNotifications: {
            presentationOptions: ['badge', 'sound', 'alert'],
        },
    },
};

export default config;
