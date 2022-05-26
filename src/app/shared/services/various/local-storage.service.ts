import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    get(key: string) {
        return localStorage.getItem(key);
    }

    set(key: string, value: any): boolean {
        localStorage.setItem(key, value);

        return true;
    }

    has(key: string): boolean {
        return !!localStorage.getItem(key);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}
