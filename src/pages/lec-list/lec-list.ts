import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth-provider';
import { SubProvider } from './../../providers/sub-provider';
import { LecProvider } from './../../providers/lec-provider';

import { SearchCondition } from './../../models/sub/SearchCondition';
import { Sub } from './../../models/Sub';
import { Cat } from './../../models/Cat';
import { Lec } from './../../models/Lec';

import { WordListPage } from './../word-list/word-list';
import { WordSearchPage } from './../word-search/word-search';

@Component({
  selector: 'page-lecList',
  templateUrl: 'lec-list.html'
})
export class LecListPage {

  sub: Sub;
  cat: Cat;
  lecs: Array<Lec>;

  constructor(
    public navCtrl: NavController,
    private param: NavParams,
    private _auth: AuthProvider,
    private _sub: SubProvider,
    private _lec: LecProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.sub = this.param.get(`sub`);
    this.cat = this.param.get(`cat`);

    this.getLecs(this.cat.id);
  }

  getLecs(catId: number): void {
    this._lec.getLecsByCatId(catId).then(lecs_ => {
      this.lecs = lecs_;
    });
  }

  clickLec(lec: Lec): void {

    let levIds = new Array<number>();
    let count = -1;
    let lecIds = [lec.id];

    const params = {
      activeName: this._sub.getActiveName(this.sub.id), 
      sc: new SearchCondition(this.sub, this.cat, lec, lecIds, levIds, count, false, this._auth.uid)
    }

    this.navCtrl.push(WordListPage, params);
  }

  moveWordTestPage(): void {
    const params = {
      activeName: this._sub.getActiveName(this.sub.id), 
      sub: this.sub, 
      cat: this.cat
    }

    this.navCtrl.push(WordSearchPage, params);
  }

}
