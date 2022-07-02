import { PercentagePipe } from './percentage.pipe';

describe('MomentFormatAgoPipe', () => {
    it('create an instance', () => {
        const pipe = new PercentagePipe();
        expect(pipe).toBeTruthy();
    });

    it('Pipe', () => {
        const pipe = new PercentagePipe();

        const result = pipe.transform([], '11');
        expect(result).toBeDefined();
    });

    // it('Pipe B', () => {
    //   const pipe = new PercentagePipe();
    //     const result = pipe.transform('2020-01-01', 'DD-MM-YYYY');
    //     expect(result).toBeDefined();
    // });
});
