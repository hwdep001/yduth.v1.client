import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Word } from './../../models/Word';

@Component({
  selector: 'sp-list',
  templateUrl: 'sp-list.html'
})
export class SpListComponent {

  _words: Array<Word>;
  _levFlag: boolean;
  
  @Output() 
  updateLevel: EventEmitter<any> = new EventEmitter();

  constructor(){}

  // ngOnChanges(changes: SimpleChanges) {}

  @Input()
  set words(words: Array<Word>) {
    if(words == undefined) return;
    
    let ox: Array<string>;
    for (let i = 0; i < words.length; i++) {
      words[i].flag1 = false;
      const word = words[i];
      word.col06 = word.col02;
      ox = [word.col02, word.col03];
      ox.shuffleArray();
      word.col02 = ox[0];
      word.col03 = ox[1];

      word.col04 = word.col04 == null ? word.col06 : word.col04;
    }

    this._words = words;
  }

  @Input()
  set levFlag(levFlag: boolean) {
    this._levFlag = levFlag;
  }

  clickThumbs(word: Word, thumbCode: number): void {
    this.updateLevel.emit({word: word, thumbCode: thumbCode});
  }

  clickAnswer(seletedAnswer: string, word: Word): void {
    word.col07 = (seletedAnswer == word.col06) ? "an-t" : "an-f";
    word.flag1 = true;
  }

}
