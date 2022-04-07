import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
    constructor(private storage: Storage) {}

    startDB() {
        return this.storage.create();
    }

    async get<T>(key: string): Promise<T> {
        await this.storage.create();
        return this.storage.get(key);
    }

    set(key: string, value: any): void {
        this.startDB();
        this.storage.set(key, value);
    }

    remove(key: string): void {
        this.storage.remove(key);
    }
}
