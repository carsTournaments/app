import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'traction',
})
export class TractionPipe implements PipeTransform {
    constructor(private translate: TranslateService) {}
    transform(value: string): string {
        switch (value) {
            case 'FWD':
                return this.translate.instant('generic.frontWheelDrive');
            case 'RWD':
                return this.translate.instant('generic.rearWheelDrive');
            case 'AWD':
                return this.translate.instant('generic.totalDrive');
            case '4WD':
                return this.translate.instant('generic.4x4ConectableDrive');
            case '4X4':
                return this.translate.instant('generic.4x4Drive');
            default:
                return 'N/D';
        }
    }
}
