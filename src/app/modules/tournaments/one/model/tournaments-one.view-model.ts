import { Header } from 'src/app/components/header/model/header.model';
import { Inscription, Tournament } from 'src/app/models';

export class TournamentsOneViewModel {
    id: string;
    header = new Header({
        title: 'Torneo',
        segments: {
            items: ['Info', 'Inscripciones', 'Rondas'],
            selected: 0
        },
        backButton: {
            state: true,
            route: '/tab/tournaments'
        }
    });
    tournament: Tournament;
    inscriptions: Inscription[] = [];
    image: string;
}
