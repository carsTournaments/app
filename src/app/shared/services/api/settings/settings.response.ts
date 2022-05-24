export interface SettingsStateI {
    admob: boolean;
}

export interface SettingsAndroidI {
    version: SettingsVersionI;
    urlMarket: string;
}

export interface SettingsIosI {
    version: SettingsVersionI;
    urlMarket: string;
}

export interface SettingsVersionI {
    latestVersion: string;
    minVersion: string;
}

export interface SettingsVersionCodeI {
    versionMajor: number;
    versionMinor: number;
    versionPatch: number;
}

export interface SettingsAppI {
    title: string;
    description: string;
    isNeedUpdate: SettingsIsNeedUpdateI;
    state: SettingsStateI;
}

export interface SettingsIsNeedUpdateI {
    update: boolean;
    mandatory: boolean;
}

export interface SettingsCheckUpdateI {
    update: boolean;
    mandatory: boolean;
    urlMarket?: string;
}
