import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalCmp, ModalController } from 'ionic-angular';
import { CarteiraPage } from '../carteira/carteira';

/**
 * Generated class for the PopoverMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-menu',
  templateUrl: 'popover-menu.html',
})
export class PopoverMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private modalCtrl:ModalController) {
  }

  
  menuOptions:any =[
    {
      id:1,
      nome:"Mudar Carteira",
      icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVGhD7dk9SgRBEMXxCQW9gRp4DgM/QAPPoYamYqCYeQExEwRZbyAqggbGHkIQTQ00EAP9FygUQyF0N9s1vdSDH8tsw9t5DBNtF4lEIhOZGWziHLcO9lCcdbzg29EIRVnDF6zymoqGTOMVVnFtRUPknegXXmIH25WtIjsX6I9oMnfQQ3bRZB6gh1yhyfSHiGvUfkc2MIXsWEO8PGMRWRnSEPGGeSRnaEPEEZIzxCE3SM4Qh8g9JSeGjFEMsco8xRCrzFMMscrG6RNbWPj9lGt93syQY+icQJ83M2QfOgfQ580MecIsJHOQa33ezBDxjkd8qO/+NDXkPzHEKvMUQ6wyTzHEKvOUNeQeVpknuafknMEq83SK5KzAKvO0jKwcwir0IPdSFHky8kitPylrkN9eQiQSiUxMuu4HY4vFecHYuk8AAAAASUVORK5CYII=",
      pageUrl:"CarteiraPage"
    },
    {
      id:2,
      nome:"Definições",
      icon:"",
      pageUrl:"ContaPage"
    }
  ]

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverMenuPage');
  }

  close(id) {
    this.viewCtrl.dismiss(id);
  }

}
