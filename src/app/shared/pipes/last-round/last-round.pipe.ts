import { Round } from '@models/round.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastRound',
})
export class LastRoundPipe implements PipeTransform {
  transform(rounds: Round[]): string {
    const round = rounds.find((r) => r.status === 'InProgress');
    return round.name;
  }
}
