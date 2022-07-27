import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private storage: Storage) {
    this.startDB();
  }

  async startDB(): Promise<Storage> {
    return this.storage.create();
  }

  async get<T>(key: string): Promise<T> {
    this.startDB();
    return this.storage.get(key);
  }

  set(key: string, value: any): void {
    this.startDB();
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.remove(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
