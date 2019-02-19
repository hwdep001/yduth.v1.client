import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Word } from './../../models/Word';

@Component({
  selector: 'ew-list',
  templateUrl: 'ew-list.html'
})
export class EwListComponent {
 
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
  
}
