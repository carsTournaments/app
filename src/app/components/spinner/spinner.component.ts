import { Component } from '@angular/core';
import { SpinnerHandlerService } from 'src/app/services';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    spinnerActive = true;

    constructor(public spinnerHandler: SpinnerHandlerService) {
        this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
    }

    showSpinner = (state: boolean): void => {
        this.spinnerActive = state;
    };
}
