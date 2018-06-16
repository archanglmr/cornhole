import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../../models/score';

@Pipe({
  name: 'formatScore',
})
export class FormatScorePipe implements PipeTransform {
  transform(team: Score) {
    if (team.bust) {
      return `BUST(${team.points})`;
    } else if (team.points) {
      return `+${team.points}`;
    }
    return '-';
  }
}