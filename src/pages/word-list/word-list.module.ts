import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordListPage } from './word-list';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    WordListPage,
  ],
  imports: [
    IonicPageModule.forChild(WordListPage),
    ComponentsModule
  ],
})
export class WordListPageModule {}
