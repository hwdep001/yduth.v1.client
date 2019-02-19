import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Word } from './../../models/Word';

@Component({
  selector: 'cc-list',
  templateUrl: 'cc-list.html'
})
export class CcListComponent {

  _words: Array<Word>;
  _levFlag: boolean;
  
  @Output() 
  updateLevel: EventEmitter<any> = new EventEmitter();

  constructor(){}

  // ngOnChanges(changes: SimpleChanges) {}

  @Input()
  set words(words: Array<Word>) {
    if(words == undefined) return;

    for (let i = 0; i < words.length; i++) {
      words[i].flag1 = false;

      words[i].col07 = this.createMeString(words[i]);
      words[i].col11 = this.createExString(words[i]);
    }

    this._words = words;
  }

  @Input()
  set levFlag(levFlag: boolean) {
    this._levFlag = levFlag;
  }

  private createMeString(word: Word): string {
    let result: string = null;

    (word.col07 == null) ? null : (result = word.col07);
    (word.col08 == null) ? null : (result += "\n" + word.col08);
    (word.col09 == null) ? null : (result += "\n" + word.col09);
    (word.col10 == null) ? null : (result += "\n" + word.col10);

    return result;
  }

  private createExString(word: Word): string {
      let result: string = null;

      (word.col11 == null) ? null : (result = word.col11);
      (word.col12 == null) ? null : (result += "\n" + word.col12);
      (word.col13 == null) ? null : (result += "\n" + word.col13);
      (word.col14 == null) ? null : (result += "\n" + word.col14);

      return result;
  }

  clickThumbs(word: Word, thumbCode: number): void {
    this.updateLevel.emit({word: word, thumbCode: thumbCode});
  }

}
