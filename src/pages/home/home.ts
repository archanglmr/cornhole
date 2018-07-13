import { Component } from '@angular/core';
import { IonicPage, ModalController, Events } from 'ionic-angular';
import { Round } from '../../models/round';
import { Score } from '../../models/score';
import { CornholeKeyboardPage } from '../cornhole-keyboard/cornhole-keyboard';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
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

  constructor(
    protected events: Events,
    protected modalCtrl: ModalController,
    protected settings: SettingsProvider
  ) {
    this.events.subscribe('New Game', () => this.reset());
  }

  protected handleUndo() {
    if (this.history.length) {
      this.history.pop();
      this.gameOver = false;
    }
  }

  protected handleReplay() {
    if (this.gameOver) {
      this.reset();
    }
  }

  protected promptForPoints(team: number) {
    let modal = this.modalCtrl.create(
      CornholeKeyboardPage,
      (1 === team ?
        {title: 'Blue Team', buttonColor: 'blue-team'}:
        {title: 'Red Team', buttonColor: 'red-team'}
      ),
      {
        cssClass: 'keyboard'
      }
    );
    modal.onDidDismiss((points) => {
      if (points) {
        let team1: Score = new Score(this.team1Score);
        let team2: Score = new Score(this.team2Score);

        switch(team) {
          case 1:
            this.addPoints(team1, points);
            break;
          case 2:
            this.addPoints(team2, points);
            break;
        }
        this.history.push(new Round(team1, team2));
      }
      modal = undefined;
    });
    modal.present({animate: false});
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
    this.targetScore = this.settings.targetScore;
    this.bustScore = this.settings.bustScore;
  }
}