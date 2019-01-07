import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DadosGeraisProvider } from '../../providers/dados-gerais/dados-gerais';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  endpoint:any='';
  endpointSelected:any;

  constructor(public navCtrl: NavController,private dadosGerais:DadosGeraisProvider) {
    
  }

  ionViewDidEnter(){
    this.endpointSelected=this.dadosGerais.getEndPointSelected();
    console.log("endpointselected",this.endpointSelected);
    this.loadEndPoint();
  }

  loadEndPoint(){
    this.endpoint=this.dadosGerais.getUrlBase();
  }

  setEndPoint(){
    console.log("endpointselected after change",this.endpointSelected);
    this.dadosGerais.setUrlBase(this.endpointSelected);
    this.loadEndPoint();
  }

}
