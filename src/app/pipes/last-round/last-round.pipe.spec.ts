import { Round } from './../../models/round.model';
import { LastRoundPipe } from '..';

describe('LastRoundPipe', () => {
    it('create an instance', () => {
        const pipe = new LastRoundPipe();
        expect(pipe).toBeTruthy();
    });

    it('change first letter to uppercase', () => {
        const pipe = new LastRoundPipe();
        const round = new Round();
        round.status = 'InProgress';
        round.name = 'Prueba';
        const rounds = [round];
        const result = pipe.transform(rounds);
        const value = result === 'Prueba' ? true : false;
        expect(value).toBe(true);
    });
});
