import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform, AlertController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsProvider } from '../providers/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage: any = HomePage;

  private settingsForm: FormGroup;
  private targetScoreValues: number[] = [];
  private bustScoreValues: number[] = [];

  private get targetScore(): number { return parseInt(this.settingsForm.get('targetScore').value, 10); }
  private set targetScore(value: number) { this.settingsForm.get('targetScore').setValue(value); }

  private get bustScore(): number { return parseInt(this.settingsForm.get('bustScore').value, 10); }
  private set bustScore(value: number) { this.settingsForm.get('bustScore').setValue(value); }

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    protected alertCtrl: AlertController,
    protected events: Events,
    protected formBulder: FormBuilder,
    protected menuCtrl: MenuController,
    protected settings: SettingsProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.settingsForm = formBulder.group({
      targetScore: 0,
      bustScore: 0
    });
    this.resetScore();

    this.settingsForm.get('targetScore').valueChanges.subscribe((value) => {
      this.bustScore = Math.min(this.bustScore, this.targetScore);
      this.updateBustScores();
      if (this.bustScore === this.targetScore) {
        this.bustScore = Math.max(this.settings.minimumScore, this.targetScore - 4)
      }
    });

    for (let i = this.settings.minimumScore; i <= this.settings.maximumScore; i += 1) {
      this.targetScoreValues.push(i);
    }

    this.updateBustScores();
  }

  private resetScore(): void {
    this.bustScore = this.settings.bustScore;
    this.targetScore = this.settings.targetScore;
  }

  private newGame(): void {
    this.alertCtrl.create({
      title: 'New Game',
      subTitle: 'All progress will be lost. Are you sure you\'d like to start a new game?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // update game
            this.settings.targetScore = this.targetScore;
            this.settings.bustScore = this.bustScore;
            this.events.publish('New Game');
            this.menuCtrl.close();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => this.resetScore()
        }
      ]
    }).present();
  }

  private updateBustScores(): void {
    this.bustScoreValues = [];
    for (let i = this.settings.minimumScore, c = this.targetScore; i <= c; i += 1) {
      this.bustScoreValues.push(i);
    }
  }
}