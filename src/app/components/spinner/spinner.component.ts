import { Component, Input } from '@angular/core';
import { SpinnerHandlerService } from 'src/app/services';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    @Input() loading: boolean;
}
