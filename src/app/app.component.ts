import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  protected settings: FormGroup;
  protected targetScores: number[] = [];
  protected bustScores: number[] = [];

  private get targetScore(): number { return this.settings.get('targetScore').value; }
  private set targetScore(value: number) { this.settings.get('targetScore').setValue(value); }

  private get bustScore(): number { return this.settings.get('bustScore').value; }
  private set bustScore(value: number) { this.settings.get('bustScore').setValue(value); }

  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    protected formBulder: FormBuilder
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.settings = formBulder.group({
      targetScore: 21,
      bustScore: 17
    });

    this.settings.get('targetScore').valueChanges.subscribe((value) => {
      this.bustScore = Math.min(this.bustScore, this.targetScore);
      this.updateBustScores();
    });

    for (let i = 10, c = 30; i <= c; i += 1) {
      this.targetScores.push(i);
    }

    this.updateBustScores();
  }

  private updateBustScores() {
    this.bustScores = [];
    for (let i = 10, c = this.targetScore; i <= c; i += 1) {
      this.bustScores.push(i);
    }
  }
}

