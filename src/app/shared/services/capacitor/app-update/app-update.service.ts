import { Injectable } from '@angular/core';
import {
  AppUpdate,
  AppUpdateInfo,
  AppUpdateAvailability,
} from '@capawesome/capacitor-app-update';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  getCurrentAppVersion = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    return result.currentVersion;
  };

  getAvailableAppVersion = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    return result.availableVersion;
  };

  openAppStore = async () => {
    await AppUpdate.openAppStore();
  };

  async getAppUpdateInfo(): Promise<AppUpdateInfo> {
    return AppUpdate.getAppUpdateInfo();
  }

  async performImmediateUpdate() {
    const result = await AppUpdate.getAppUpdateInfo();
    if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
      return;
    }
    if (result.immediateUpdateAllowed) {
      await AppUpdate.performImmediateUpdate();
    }
  }

  startFlexibleUpdate = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
      return;
    }
    if (result.flexibleUpdateAllowed) {
      const result = await AppUpdate.startFlexibleUpdate();
      console.log(result);
    }
  };

  completeFlexibleUpdate = async () => {
    await AppUpdate.completeFlexibleUpdate();
  };
}
