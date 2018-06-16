import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  protected history: Round[] = [];
  protected gameOver = false;

  protected targetScore = 21;
  protected bustScore = 17;

  protected get team1Score(): number { return this.history.length ? this.history[this.history.length - 1].team1.total : 0; }
  protected get team2Score(): number { return this.history.length ? this.history[this.history.length - 1].team2.total : 0; }

  protected get team1Winner(): boolean { return this.gameOver ? this.team1Score === this.targetScore : false; }
  protected get team2Winner(): boolean { return this.gameOver ? this.team2Score === this.targetScore : false; }

  constructor() {
    let interval = setInterval(() => {
      let points = Math.round((Math.random() * 6));
      let round: Round;
      let team1: Score = new Score(this.team1Score);
      let team2: Score = new Score(this.team2Score);

      if (Math.round(Math.random())) {
        this.addPoints(team1, points);
        // this.team1Score = team1.total;
      } else {
        this.addPoints(team2, points);
        // this.team2Score = team2.total;
      }

      if (this.gameOver) {
        clearInterval(interval);
      }

      this.history.push(new Round(team1, team2));
    }, 250);
  }

  private addPoints(team: Score, points: number) {
    team.points = points;
    team.total += team.points;
    if (team.total > this.targetScore) {
      team.total = this.bustScore;
      team.bust = true;
    } else if (team.total === this.targetScore) {
      this.gameOver = true;
    }
  }


  protected reset() {
    this.history = [];
    this.gameOver = false;
  }
}

class Round {
  constructor(
    public team1: Score,
    public team2: Score
  ) {}
}

class Score {
  public bust: boolean = false;
  public points: number = 0;
  constructor(public total: number) {}
}