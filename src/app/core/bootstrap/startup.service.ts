import { Injectable } from '@angular/core';
import { TogglesService } from '@core/toggles/toggles.service';

@Injectable({
    providedIn: 'root',
})
export class StartupService {
    constructor(private togglesService: TogglesService) {}

    load() {
        return this.togglesService.getInitialsToggles();
    }
}
