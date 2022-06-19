import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Literal } from '@models';
import { LocalStorageService } from '@services/various/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LiteralService {
    private change$ = new BehaviorSubject<Literal[]>([]);
    private _literals?: Literal[] = [];
    private path = `${environment.urlApi}/literal`;
    constructor(
        private store: LocalStorageService,
        private httpClient: HttpClient
    ) {}

    private get literals(): Literal[] {
        if (!this._literals || this._literals.length === 0) {
            this._literals = this.store.get('literals')
                ? JSON.parse(this.store.get('literals'))
                : [];
            return this._literals;
        } else {
            return this._literals;
        }
    }

    getInitialsLiterals(): Promise<void> {
        return new Promise((resolve) => {
            this.httpClient
                .post(`${this.path}/getAll`, { site: 'app' })
                .subscribe((literals: Literal[]) => {
                    this.save(literals);
                    resolve();
                });
        });
    }

    set(literals: Literal[]) {
        this.save(literals);
        return this;
    }

    clear(): void {
        this.save();
    }

    private save(literals?: Literal[]): void {
        this._literals = [];
        if (literals.length === 0) {
            this.store.remove('literals');
        } else {
            this.store.set('literals', JSON.stringify(literals));
            this._literals = literals;
        }
        this.change$.next(literals);
    }
}
