import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
    reloadPage() {
        window.location.reload();
    }

    truncateText(value: string, maxLength = 10): string {
        if (value && value.length > maxLength) {
            value = value.slice(0, maxLength);
            value += '...';
        }

        return value;
    }
}
