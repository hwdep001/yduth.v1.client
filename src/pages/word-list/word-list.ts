import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import isEqual from 'lodash/isEqual';

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

  title: string;
  sc: SearchCondition;
  words: Array<Word>;
  _words: Array<Word>;

  // level filter
  filterFlag: boolean;
  levs: Array<number>;
  selectLevs: Array<number>;

  //
  randomFlag: boolean;
  levFlag: boolean = true;

  constructor(
    private param: NavParams,
    private alertCtrl: AlertController,
    private _cmn: CommonProvider,
    private _word: WordProvider
  ) {
  }

  ionViewDidLoad() {

    this.sc = this.param.get("sc");
    
    this.setTitle();
    this.getWords();
    this.setLevelFilter();
    this.setRandomFlag();

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

        this._words = _words;

        if (this.filterFlag) {
          this.words = this.filterWords();
        } else {
          this.words = _words;
        }

        this.content.scrollToTop();
        loader.dismiss();

        this._cmn.Toast.present("bottom", this.words.length + " 단어", null);
      })
      .catch(err => {
        loader.dismiss();
        console.log(err);
        alert(err);
      });
  }

  setLevelFilter(): void {
    this.filterFlag = false;
    this.levs = new Array<number>();
    this.selectLevs = new Array<number>();

    if (this.sc.levelIdList.length == 0) {
      this.levs = [2, 1 , 0, -1, -2];
    } else {
      this.sc.levelIdList.forEach(levId => {
        this.levs.push(parseInt(levId + ''));
      });
    }

    this.selectLevs = this.levs;
  }

  setRandomFlag(): void {
    this.randomFlag = this.sc.randomed;
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

  orderQue(): void {
    this.sc.randomed = false;
    this.setRandomFlag();
    this.getWords();
  }

  shuffleQue(): void {
    this.sc.randomed = true;
    this.setRandomFlag();
    this.getWords();
  }

  fliterQue(): void {

    let inputs = [];

    this.levs.forEach(levId => {
      inputs.push({
        type: 'checkbox',
        label: levId,
        value: levId,
        checked: this.selectLevs.indexOf(levId) > -1
      });
    });

    this.presentLevelAlert(inputs).then(_selectLevs => { 

      if(_selectLevs.length > 0) {

        const loader = this._cmn.getLoader(null, null);
        loader.present();
        
        this.selectLevs = _selectLevs;
        this.words = this.filterWords();

        if (isEqual(this.levs,this.selectLevs)) {
          this.filterFlag = false;
        } else {
          this.filterFlag = true;
        }

        this.content.scrollToTop();
        loader.dismiss();

        this._cmn.Toast.present("bottom", this.words.length + " 단어", null);
      }

    }).catch(() => null);
  }

  fliterLev(): void {
    this.levFlag = !this.levFlag;
  }

  filterWords(): Array<Word> {

    let result = new Array<Word>();
    const words = this._words;
    const selectLevs = this.selectLevs;

    words.forEach(word => {
      if (selectLevs.indexOf(word.levelId) > -1) {
        result.push(word);
      }
    });

    return result;
  }

  private presentLevelAlert(inputs): Promise<Array<number>> {
    return new Promise<Array<number>>((resolve, reject) => {
        let check = this.alertCtrl.create({
            title: 'Filter',
            message: null,
            inputs: inputs,
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        reject();
                    }
                },
                {
                    text: 'Select',
                    handler: data => {
                        resolve(data as Array<number>);
                    }
                }
            ]
        });
        check.present();
    });
  }

}
