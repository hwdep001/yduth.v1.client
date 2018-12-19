import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Word } from './../../models/Word';

@Component({
  selector: 'c4-list',
  templateUrl: 'c4-list.html'
})
export class C4ListComponent {

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
    }
    
    this._words = words;
  }

  clickThumbs(word: Word, thumbCode: number): void {
    this.updateLevel.emit({word: word, thumbCode: thumbCode});
  }

}
