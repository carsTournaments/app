import { Car, User } from '.';

export const user = new User({
    _id: '123',
    name: 'prueba',
    email: 'prueba@prueba.es',
    role: 'USER',
});

export const car = new Car({
    _id: '123',
    brand: 'prueba',
    model: 'prueba',
    driver: '1',
    year: 2021,
    cc: 1,
    cv: 1,
    stock: false,
    fuel: 'Gasolina',
    traction: 'Delantera',
    info: 'yeah',
});
