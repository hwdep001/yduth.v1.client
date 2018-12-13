import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';

import { environment } from './../environments/environment';

import { ResponseDate } from './../models/ResponseData';
import { User } from './../models/User';

@Injectable()
export class AuthProvider {

  private reqUrl: String;

  constructor(
    public http: HttpClient,
    private afAuth: AngularFireAuth, 
    private gplus: GooglePlus,
    private platform: Platform
  ) {
    this.reqUrl = environment.requestUrl;
  }

  private user_: User = new User();
    
  get user(): User {
      return this.user_;
  }

  get uid(): string {
      return this.existUser? this.user_.uid : null;
  }

  get displayName(): string {
      return this.existUser? this.user_.displayName : null;
  }

  get email(): string {
      return this.existUser? this.user_.email : null;
  }

  get photoUrl(): string {
      return this.existUser? this.user_.photoUrl : null;
  }

  get createDate(): string {
      return this.existUser? this.user_.createDate : null;
  }

  get lastDate(): string {
      return this.existUser? this.user_.lastDate : null;
  }

  get roleId(): number {
    return this.existUser? this.user_.roleId : 0;
  }

  get subIdList(): Array<string> {
    return this.existUser? this.user_.subIdList : null;
  }

  get isAuth(): boolean {
      return (this.existUser == true && this.roleId > 0)? true : false;
  }

  get existUser(): boolean {
      return this.user_ == null ? false: true;
  }

  signInWithGoogle() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    try {
  
      const gplusUser = await this.gplus.login({
        'webClientId': environment.webClientId,
        'offline': false,
        'scopes': 'profile email'
      });
  
      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
  
    } catch(err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      // const credential = 
      await this.afAuth.auth.signInWithPopup(provider);
  
    } catch(err) {
      console.log(err);
    }
  
  }

  signOut() {
    this.user_ = null;
    this.afAuth.auth.signOut();
  }

  singIn(): Promise<User> {
    return this.getIdToken().then(idToken => {
      return new Promise<User>((resolve, reject) => {

        this.http.post(`${this.reqUrl}/auth/sign-in-up`, null, {
          headers: new HttpHeaders().set('Authorization', idToken)
        }).subscribe(data => {

          const resData = data as ResponseDate;
          this.user_ = resData.data as User;

          if(resData.res) {
            resolve(this.user_);
          } else {
            const msg: string = resData.code + ": " + resData.msg;
            console.log(msg);
            reject(msg);
          }

        }, err => {
          console.log(err);
          reject(err);
        });
      });
    });
  }

  getIdToken(): Promise<any> {
    return this.afAuth.auth.currentUser.getIdToken(true);
  }

}