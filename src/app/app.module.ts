import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { DadosGeraisProvider } from '../providers/dados-gerais/dados-gerais';
import { HttpClientModule } from '@angular/common/http';
import { CarteiraProvider } from '../providers/carteira/carteira';
import { CategoriasPage } from '../pages/categorias/categorias';
import { TransacaoProvider } from '../providers/transacao/transacao';
import { CarteiraPage } from '../pages/carteira/carteira';
import { TransacaoPage } from '../pages/transacao/transacao';
import { PopoverMenuPage } from '../pages/popover-menu/popover-menu';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CategoriasPage,
    CarteiraPage,
    TransacaoPage,
    PopoverMenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CategoriasPage,
    CarteiraPage,
    TransacaoPage,
    PopoverMenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriasProvider,
    DadosGeraisProvider,
    CarteiraProvider,
    TransacaoProvider
  ]
})
export class AppModule {}
