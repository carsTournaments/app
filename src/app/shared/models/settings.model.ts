import {
  SettingsIsNeedUpdateI,
  SettingsStateI,
} from '../services/api/settings/settings.response';

export class SettingsApp {
  title: string;
  description: string;
  isNeedUpdate?: SettingsIsNeedUpdateI;
  status: SettingsStateI;
  updated?: string;
}
