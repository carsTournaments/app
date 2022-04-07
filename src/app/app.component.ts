import { StorageService } from './services/ionic/storage.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private storageService: StorageService) {
        this.storageService.startDB();
    }
}
