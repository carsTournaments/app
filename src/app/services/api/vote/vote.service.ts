import { IdDto } from 'src/app/core/dtos/id.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Vote } from 'src/app/models/vote.model';
import { Observable } from 'rxjs';
import { StorageService } from '../..';

@Injectable({ providedIn: 'root' })
export class VoteService {
    url = `${environment.urlApi}/votes`;
    constructor(
        private httpClient: HttpClient,
        private storageService: StorageService
    ) {}

    getAllOfCar(data: IdDto): Observable<Vote[]> {
        return this.httpClient.post<Vote[]>(`${this.url}/allOfCar`, data);
    }

    getAllOfTournament(data: IdDto): Observable<Vote[]> {
        return this.httpClient.post<Vote[]>(
            `${this.url}/allOfTournament`,
            data
        );
    }

    create(data: Vote): Observable<Vote> {
        return this.httpClient.post<Vote>(`${this.url}/create`, data);
    }

    delete(id: string): Observable<Vote> {
        return this.httpClient.delete<Vote>(`${this.url}/one/${id}`);
    }

    async isValidVote(vote: Vote): Promise<boolean> {
        const status = true;
        const votes = await this.storageService.get<Vote[]>(`votes`);
        if (votes) {
            const voted = votes.find((v) => v.pairing === vote.pairing);
            if (voted) {
                return false;
            }
        }
        return status;
    }

    async setValidVote(vote: Vote): Promise<void> {
        const votes = await this.storageService.get<Vote[]>(`votes`);
        if (votes) {
            votes.push(vote);
            this.storageService.set(`votes`, votes);
        } else {
            this.storageService.set(`votes`, [vote]);
        }
    }
}
