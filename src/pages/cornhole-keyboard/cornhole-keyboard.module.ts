import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CornholeKeyboardPage } from './cornhole-keyboard';

@NgModule({
  declarations: [
    CornholeKeyboardPage
  ],
  imports: [
    IonicPageModule.forChild(CornholeKeyboardPage)
  ]
})
export class CornholeKeyboardPageModule {}