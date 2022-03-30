import { Round } from 'src/app/models/round.model';
import { Inscription } from 'src/app/models/inscription.model';
import * as moment from 'moment';
import { Image } from './image.model';
export class Tournament {
  _id?: string;
  name: string;
  maxParticipants: number;
  requisites: TournamentRequisiteI[];
  startDate: string;
  endDate: string;
  status?: string;
  durationDays?: number;
  rounds?: Round[]; // Virtual
  inscriptions?: Inscription[]; // CarI[]
  image: Image;
  created?: string;
  updated?: string;
  constructor(data?: Tournament) {
    this._id = data?._id;
    this.name = data?.name || '';
    this.maxParticipants = data?.maxParticipants || 32;
    this.requisites = data?.requisites || [];
    this.startDate = data?.startDate || moment().format('YYYY-MM-DD HH:mm');
    this.endDate = data?.endDate || '';
    this.status = data?.status || 'Todo';
    this.durationDays = data?.durationDays || 10;
    this.rounds = data?.rounds || [];
    this.inscriptions = data?.inscriptions || [];
    this.image = data?.image || new Image();
    this.created = data?.created;
    this.updated = data?.updated;
  }

  getRequisitesDefault(): TournamentRequisiteI[] {
    return [
      {
        name: 'Coches Europeos',
        field: 'continent',
        operator: '=',
        value: 'Europa',
      },
      {
        name: 'Coches Americanos',
        field: 'continent',
        operator: '=',
        value: 'America',
      },
      {
        name: 'Coches Asiáticos',
        field: 'continent',
        operator: '=',
        value: 'Asia',
      },
      {
        name: 'Menos de 100CV',
        field: 'cv',
        operator: '<',
        value: 100,
      },
      {
        name: 'Menos de 200CV',
        field: 'cv',
        operator: '<',
        value: 100,
      },
      {
        name: 'Más de 100CV',
        field: 'cv',
        operator: '>',
        value: 100,
      },
      {
        name: 'Más de 200CV',
        field: 'cv',
        operator: '>',
        value: 200,
      },
    ];
  }
}

export interface TournamentRequisiteI {
  name: string;
  field: string;
  operator: string;
  value: any;
}
