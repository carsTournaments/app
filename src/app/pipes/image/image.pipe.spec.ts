import { ImagePipe } from 'src/app/pipes';


describe('ImagePipe', () => {

    it('create an instance', () => {
        const pipe = new ImagePipe();
        expect(pipe).toBeTruthy();
    });

    it('show image', () => {
        const pipe = new ImagePipe();
        const result = pipe.transform('loquesea');
        expect(result).toBe('http://localhost:5454/uploads/loquesea');
    });
    
    it('show image', () => {
        const pipe = new ImagePipe();
        const result = pipe.transform(null);
        expect(result).toBe('assets/no-image.png');
    });
});