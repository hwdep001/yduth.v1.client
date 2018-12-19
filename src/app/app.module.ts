import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GooglePlus } from '@ionic-native/google-plus';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

// environment
import { environment } from './../environments/environment';

// providers
import { CommonProvider } from './../providers/common-provider';
import { AuthProvider } from './../providers/auth-provider';
import { HomeProvider } from './../providers/home-provider';
import { SubProvider } from './../providers/sub-provider';
import { CatProvider } from './../providers/cat-provider';
import { LecProvider } from './../providers/lec-provider';
import { WordProvider } from './../providers/word-provider';
import { SettingProvider } from './../providers/setting-provider';

// components
import { ComponentsModule } from './../components/components.module';

// pages
import { BackgroundPage } from './../pages/background/background';
import { SignInPage } from './../pages/sign-in/sign-in';
import { HomePage } from './../pages/home/home';
import { CatListPage } from './../pages/cat-list/cat-list';
import { LecListPage } from './../pages/lec-list/lec-list';
import { WordListPage } from './../pages/word-list/word-list';
import { WordSearchPage } from './../pages/word-search/word-search';
import { SettingTabPage } from './../pages/setting/setting-tab';
import { InfoPage } from './../pages/setting/info/info';
import { WordMngPage } from './../pages/setting/word-mng/word-mng';
import { LevelReset } from './../pages/setting/level-reset/level-reset';

@NgModule({
  declarations: [
    MyApp,
    BackgroundPage,
    SignInPage,
    HomePage,
    CatListPage,
    LecListPage,
    WordListPage,
    WordSearchPage,
    SettingTabPage,
    InfoPage,
    WordMngPage,
    LevelReset
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: 'top' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BackgroundPage,
    SignInPage,
    HomePage,
    CatListPage,
    LecListPage,
    WordListPage,
    WordSearchPage,
    SettingTabPage,
    InfoPage,
    WordMngPage,
    LevelReset
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    AuthProvider,
    HomeProvider,
    SubProvider,
    CatProvider,
    LecProvider,
    WordProvider,
    SettingProvider
  ]
})
export class AppModule {}
