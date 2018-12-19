import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Content } from 'ionic-angular';

import { CommonProvider } from './../../providers/common-provider';
import { WordProvider } from './../../providers/word-provider';

import { SearchCondition } from './../../models/sub/SearchCondition';
import { Word } from './../../models/Word';

@IonicPage()
@Component({
  selector: 'page-word-list',
  templateUrl: 'word-list.html',
})
export class WordListPage {
  @ViewChild(Content) content: Content;

  isDataLoaded: boolean = false;
  words: Array<Word>;
  sc: SearchCondition;
  title: string;

  constructor(
    private param: NavParams,
    private _cmn: CommonProvider,
    private _word: WordProvider
  ) {
  }

  ionViewDidLoad() {

    this.sc = this.param.get("sc");

    this.setTitle();
    this.getWords();

    this.isDataLoaded = true;
  }

  setTitle(): void {
    if (this.sc.randomed) {
      this.title = this.sc.cat.name;
    } else {
      this.title = this.sc.lec.name;
    }
  }

  getWords() {
    const loader = this._cmn.getLoader(null, null);
    loader.present();

    this._word.getWordsBySearch(this.sc)
      .then(_words => {
        this.words = _words;
        this.content.scrollToTop();
        loader.dismiss();

        this._cmn.Toast.present("bottom", _words.length + " 단어", null);
      })
      .catch(err => {
        loader.dismiss();
        console.log(err);
        alert(err);
      });
  }

  orderQue(): void {
    this.sc.randomed = false;
    this.getWords();
  }

  shuffleQue(): void {
    this.sc.randomed = true;
    this.getWords();
  }

  updateLevel($event): void {
    const word = $event.word;
    const thumbCode = $event.thumbCode;

    const preLevel: number = (word.levelId == undefined ? 0 : word.levelId);
    const level: number = thumbCode + preLevel;

    if (level > 2 || level < -2) {
      return;
    } else {
      this._word.updateWordLevel(word.id, level)
        .then()
        .catch(() => word.levelId = preLevel);
      word.levelId = level;
    }
  }

}
