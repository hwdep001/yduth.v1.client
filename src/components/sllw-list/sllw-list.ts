import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Word } from './../../models/Word';

@Component({
  selector: 'sllw-list',
  templateUrl: 'sllw-list.html'
})
export class SllwListComponent {

  _words: Array<Word>;
  
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
      word.col06 = word.col01;
      ox = [word.col01, word.col02];
      ox.shuffleArray();
      word.col01 = ox[0];
      word.col02 = ox[1];

      word.col03 = word.col03 == null ? word.col06 : word.col03;
    }

    this._words = words;
  }

  clickThumbs(word: Word, thumbCode: number): void {
    this.updateLevel.emit({word: word, thumbCode: thumbCode});
  }

  clickAnswer(seletedAnswer: string, word: Word): void {
    word.col07 = (seletedAnswer == word.col06) ? "an-t" : "an-f";
    word.flag1 = true;
  }

}
