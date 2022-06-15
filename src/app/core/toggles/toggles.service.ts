import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Toggle } from '@models';
import { LocalStorageService } from '@services/various/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TogglesService {
    private change$ = new BehaviorSubject<Toggle[]>([]);
    private _toggles?: Toggle[] = [];
    private path = `${environment.urlApi}/toggles`;

    constructor(
        private store: LocalStorageService,
        private httpClient: HttpClient
    ) {}

    private get toggles(): Toggle[] {
        if (!this._toggles || this._toggles.length === 0) {
            this._toggles = this.store.get('toggles')
                ? JSON.parse(this.store.get('toggles'))
                : [];
            return this._toggles;
        } else {
            return this._toggles;
        }
    }

    getInitialsToggles(): Promise<void> {
        return new Promise((resolve) => {
            this.httpClient
                .post(`${this.path}/getAll`, { site: 'app' })
                .subscribe((toggles: Toggle[]) => {
                    this.save(toggles);
                    resolve();
                });
        });
    }

    set(toggles: Toggle[]) {
        this.save(toggles);
        return this;
    }

    clear(): void {
        this.save();
    }

    async isActiveToggle(name: string): Promise<boolean> {
        const toggle = this.toggles.find((t) => t.name === name);
        console.log(name, this.toggles);
        return toggle ? toggle.state : false;
    }

    private save(toggles?: Toggle[]): void {
        this._toggles = [];
        if (toggles.length === 0) {
            this.store.remove('toggles');
        } else {
            this.store.set('toggles', JSON.stringify(toggles));
            this._toggles = toggles;
        }

        this.change$.next(toggles);
    }
}
