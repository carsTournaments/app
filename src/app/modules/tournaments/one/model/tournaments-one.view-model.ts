import { Header } from "src/app/components/header/model/header.model";
import { Tournament } from "src/app/models/tournament.model";

export class TournamentsOneViewModel {
    id: string;
    header = new Header({
        title: 'Torneo',
        segments: {
            items: ['Info', 'Inscripciones', 'Rondas'],
            selected: 0
        },
        backButton: true
    })
    tournament: Tournament;
}