import { Header } from '@components/header/model/header.model';
import { config } from '@config';
import { CarTotalsI } from '@interfaces';
import { Car, Inscription, Like, User, Vote } from '@models';

export class CarViewModel {
  id: string;
  header = new Header({
    title: 'Coches',
    backButton: {
      state: true,
      route: config.routes.cars,
      default: true,
    },
    rightButtons: [
      {
        state: true,
        icon: 'arrow-redo-outline',
      },
    ],
  });
  user: User;
  car: Car;
  isMyCar = false;
  image: string;
  loading = true;
  states = {
    likes: false,
    votes: false,
    inscriptions: false,
  };
  likes: Like[] = [];
  inscriptions: Inscription[] = [];
  votes: Vote[] = [];
  error = false;
  liked = false;
  items: CarTotalsI;
  itemsOrder = [
    { name: 'Carreras', value: 'pairings' },
    { name: 'Victorias', value: 'pairingsWinners' },
    { name: 'Votos', value: 'votes' },
    { name: 'Inscripciones', value: 'inscriptions' },
    { name: 'Me Gustas', value: 'likes' },
    { name: 'Oro/Plata/Bronce', value: 'tournamentsWinners' },
  ];
}
