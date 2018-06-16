import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cornhole-keyboard',
  templateUrl: 'cornhole-keyboard.html',
})
export class CornholeKeyboardPage {
  protected keys = [
    9, 10, 11, 12,
    5, 6, 7, 8,
    1, 2, 3, 4
  ];
  protected title: string;
  protected buttonColor: string;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {}

  protected ionViewWillEnter() {
    this.title = this.navParams.get('title');
    this.buttonColor = this.navParams.get('buttonColor') || 'primary';
  }

  protected handleClose() {
    this.viewCtrl.dismiss();
  }

  protected handleClick(value: number) {
    this.viewCtrl.dismiss(value);
  }
}