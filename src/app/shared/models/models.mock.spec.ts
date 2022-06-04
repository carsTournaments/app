import { Car, Inscription, Tournament, User } from '.';

export const user = new User({
    _id: '123',
    name: 'prueba',
    email: 'prueba@prueba.es',
    country: 'es',
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

export const tournament = new Tournament({
    _id: '123',
    name: 'prueba',
    status: 'Todo',
    startDate: '',
    endDate: '',
    info: '',
    requisites: [],
    maxParticipants: 0,
});

export const inscription = new Inscription({
    _id: '123',
    car: '1',
    tournament: '2',
    driver: '1',
});
