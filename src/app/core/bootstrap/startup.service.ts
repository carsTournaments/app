import { Injectable } from '@angular/core';
import { ToggleService } from '@core/services/toggle.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private togglesService: ToggleService) {}

  load() {
    return this.togglesService.getInitialsToggles();
  }
}
