import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Word } from './../../models/Word';

@Component({
  selector: 'kw-list',
  templateUrl: 'kw-list.html'
})
export class KwListComponent {

  _words: Array<Word>;
  
  @Output() 
  updateLevel: EventEmitter<any> = new EventEmitter();

  constructor(){}

  // ngOnChanges(changes: SimpleChanges) {}

  @Input()
  set words(words: Array<Word>) {
    if(words == undefined) return;
    
    for (let i = 0; i < words.length; i++) {
      words[i].flag1 = false;
      words[i].flag2 = false;

      words[i].col15 = this.createMeString(words[i]);
      words[i].col16 = this.createExString(words[i]);
    }

    this._words = words;
  }

  private createMeString(word: Word): string {
    let result: string = null;

    (word.col02 == null) ? null : (result = word.col02);
    (word.col03 == null) ? null : (result += "\n" + word.col03);
    (word.col04 == null) ? null : (result += "\n" + word.col04);
    (word.col05 == null) ? null : (result += "\n" + word.col05);
    (word.col06 == null) ? null : (result += "\n" + word.col06);
    (word.col07 == null) ? null : (result += "\n" + word.col07);
    (word.col08 == null) ? null : (result += "\n" + word.col08);

    return result;
  }

  private createExString(word: Word): string {
      let result: string = null;

      (word.col09 == null) ? null : (result = word.col09);
      (word.col10 == null) ? null : (result += "\n" + word.col10);
      (word.col11 == null) ? null : (result += "\n" + word.col11);
      (word.col12 == null) ? null : (result += "\n" + word.col12);
      (word.col13 == null) ? null : (result += "\n" + word.col13);
      (word.col14 == null) ? null : (result += "\n" + word.col14);

      return result;
  }

  clickThumbs(word: Word, thumbCode: number): void {
    this.updateLevel.emit({word: word, thumbCode: thumbCode});
  }

}
