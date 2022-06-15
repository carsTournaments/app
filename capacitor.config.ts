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
                'https://api.carstournaments.com/ota/getOtaAvailable/',
        },
        PushNotifications: {
            presentationOptions: ['badge', 'sound', 'alert'],
        },
        GoogleAuth: {
            scopes: ['profile', 'email'],
            serverClientId:
                '432785685251-2q1rfgi63ssrf8dhim75ao5dsudh3a6g.apps.googleusercontent.com',
        },
    },
};

export default config;
