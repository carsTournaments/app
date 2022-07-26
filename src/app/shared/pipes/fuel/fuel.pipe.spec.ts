import { FuelPipe } from './fuel.pipe';

describe('FuelPipe', () => {
    it('create an instance', () => {
        const pipe = new FuelPipe();
        expect(pipe).toBeTruthy();
    });

    it('option -> diesel', () => {
        const pipe = new FuelPipe();
        const result = pipe.transform('diesel');
        const value = result === 'Diesel' ? true : false;
        expect(value).toBe(true);
    });

    it('option -> gasoline', () => {
        const pipe = new FuelPipe();
        const result = pipe.transform('gasoline');
        const value = result === 'Gasolina' ? true : false;
        expect(value).toBe(true);
    });

    it('option -> hybrid', () => {
        const pipe = new FuelPipe();
        const result = pipe.transform('hybrid');
        const value = result === 'Hibrido' ? true : false;
        expect(value).toBe(true);
    });

    it('option -> electric', () => {
        const pipe = new FuelPipe();
        const result = pipe.transform('electric');
        const value = result === 'Eléctrico' ? true : false;
        expect(value).toBe(true);
    });

    it('option -> n/d', () => {
        const pipe = new FuelPipe();
        const result = pipe.transform('n/d');
        const value = result === 'N/D' ? true : false;
        expect(value).toBe(true);
    });
});
