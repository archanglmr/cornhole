import { Injectable } from '@angular/core';

@Injectable()
export class SettingsProvider {
  public get minimumScore(): number { return this.settings.minimumScore; }
  public get maximumScore(): number { return this.settings.maximumScore; }
  public get defaultTarget(): number { return this.settings.defaultTarget; }
  public get defaultBust(): number { return this.settings.defaultBust; }

  public get targetScore(): number { return this.settings.targetScore; }
  public set targetScore(score: number) { this.settings.targetScore = score; }

  public get bustScore(): number { return this.settings.bustScore; }
  public set bustScore(score: number) { this.settings.bustScore = score; }

  public get team1Name(): string { return this.settings.team1Name; }
  public get team2Name(): string { return this.settings.team2Name; }

  private settings: Settings = new Settings;
}


class Settings {
  public minimumScore = 10;
  public maximumScore = 30;

  public defaultTarget = 21;
  public defaultBust = 17;

  public targetScore = 21;
  public bustScore = 17;

  public team1Name = 'Blue';
  public team2Name = 'Red';
}