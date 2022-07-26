import { TranslateService } from '@ngx-translate/core';
import { translateService } from '@services/services.mock.spec';
import { TractionPipe } from './traction.pipe';

describe('TractionPipe', () => {
    it('create an instance', () => {
        let translation: TranslateService = translateService;
        const pipe = new TractionPipe(translation);

        expect(pipe).toBeTruthy();
    });
});
