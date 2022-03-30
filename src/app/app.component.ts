import { StorageService } from './services/ionic/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private storageService: StorageService) {}

    async ngOnInit() {
        await this.storageService.startDB();
    }
}
