import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ImageUploadDto } from './image.dto';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class ImageService {
    url = `${environment.urlApi}/images`;
    constructor(private httpClient: HttpClient) {}

    async addNewToGallery(type: 'car' | 'user', id: string): Promise<Image> {
        try {
            const image = await Camera.getPhoto({
                resultType: CameraResultType.Base64,
                source: CameraSource.Photos,
                quality: 100,
                allowEditing: false,
            });
            const blobData = this.b64toBlob(
                image.base64String,
                `image/${image.format}`
            );
            const file = new File([blobData], 'file.jpg');
            const formData = new FormData();
            formData.append('file', file, file.name);
            return this.upload({ type, id }, file);
        } catch (error) {
            console.error(error);
        }
    }

    private b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    upload(data: ImageUploadDto, file: File): Promise<Image> {
        const url = `${this.url}/upload`;
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', data.type);
        formData.append('id', data.id);
        return this.httpClient.post<any>(url, formData).toPromise();
    }
}
