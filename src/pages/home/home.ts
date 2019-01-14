import { Component, ViewChild } from '@angular/core';
import { NavController, DateTime, NavParams, ModalController, Select, PopoverController } from 'ionic-angular';
import { CarteiraProvider } from '../../providers/carteira/carteira';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { CarteiraPage } from '../carteira/carteira';
import { DadosGeraisProvider } from '../../providers/dados-gerais/dados-gerais';
import { TransacaoProvider } from '../../providers/transacao/transacao';
import { TransacaoPage } from '../transacao/transacao';
import { PopoverMenuPage } from '../popover-menu/popover-menu';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Select) select: Select;

  hasCarteira:boolean = false;
  transacaoList:any=[];
  carteiraEmUso:any=[];
  totalDigital:any;
  totalFisico:any;
  accountBalance:any;
  carteiraNome:any;

  optionSelected:any = 0;




  constructor(public navCtrl: NavController,private navParams:NavParams,private carteiraProvider:CarteiraProvider,private categoriaProvider:CategoriasProvider,private dadosGeraisProvider:DadosGeraisProvider,private transacaoProvider:TransacaoProvider,private modalCtrl:ModalController,private popoverCtrl:PopoverController) {
    if(this.dadosGeraisProvider.getidCarteiraEmUso() == 0){
      console.log("dados gerais no inicio",this.dadosGeraisProvider.getCarteiraEmUso());
      this.presentModalCarteiras();
    } 
  }

  ionViewDidEnter(){
    
  }

  presentPopover(myEvent) {
    console.log("evento",myEvent)
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(result=>{
      console.log("resultado",result);
      switch(result){
        case 1 : this.navCtrl.push(CarteiraPage)
                break;
        default:""
      }
       
    })
  }

  loadTransacoes(idCarteira){
    this.transacaoProvider.GetTransacoes(idCarteira).subscribe(result =>{
      this.transacaoList=result;
      console.log("transacoes apanhadas",this.transacaoList);
    })
  }

  loadCarteira(){
    this.carteiraEmUso=this.dadosGeraisProvider.getCarteiraEmUso();
    console.log("Carteira em uso",this.carteiraEmUso);
    this.carteiraNome = this.carteiraEmUso.nome;
    this.totalDigital=this.carteiraEmUso.totalDigital;
    this.totalFisico=this.carteiraEmUso.totalFisico;
    this.accountBalance=this.carteiraEmUso.accountbalance;

  }

  novaTransacao(){
    this.navCtrl.push(TransacaoPage,this.totalFisico);
  }

  presentModalCarteiras(){
    const modal = this.modalCtrl.create(CarteiraPage);
    modal.present();
    modal.onDidDismiss(()=>{
      this.loadTransacoes(this.dadosGeraisProvider.getidCarteiraEmUso());
      this.loadCarteira();
    })
  }
  // checkCarteiras(){
  //   this.carteiraProvider.GetCarteiras().subscribe(result => {
  //     this.carteirasList = result;
  //     console.log("carterias",this.carteirasList);
  //     if(!this.carteirasList.length)
  //       this.navCtrl.push(CarteiraPage)
  //   })
  // }
}
