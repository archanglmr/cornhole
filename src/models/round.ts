import { Score } from './score';

export class Round {
  constructor(
    public team1: Score,
    public team2: Score
  ) {}
}