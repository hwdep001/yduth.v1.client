import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordSearchPage } from './word-search';

@NgModule({
  declarations: [
    WordSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(WordSearchPage),
  ],
})
export class WordSearchPageModule {}
