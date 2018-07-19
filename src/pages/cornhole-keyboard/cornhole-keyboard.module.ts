import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CornholeKeyboardPage } from './cornhole-keyboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CornholeKeyboardPage
  ],
  imports: [
    IonicPageModule.forChild(CornholeKeyboardPage),
    ComponentsModule
  ]
})
export class CornholeKeyboardPageModule {}