import { Header } from '@components/header/model/header.model';
import { OptionItemI } from '@interfaces';
import { User } from '@models';
import { SettingsApp } from '@models/settings.model';
import { UserGetResumeResponse } from '@services/api/user/user.responses';

export class AccountViewModel {
    header = new Header({
        title: '',
    });
    options: OptionItemI[] = [];
    registerMode = false;
    user: User;
    resume: UserGetResumeResponse;
    settings: SettingsApp;
    loading = true;
}
