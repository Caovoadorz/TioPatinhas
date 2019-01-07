import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarteiraProvider } from '../../providers/carteira/carteira';
import { CategoriasPage } from '../categorias/categorias';
import { DadosGeraisProvider } from '../../providers/dados-gerais/dados-gerais';

/**
 * Generated class for the CarteiraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carteira',
  templateUrl: 'carteira.html',
})
export class CarteiraPage {

  listaCarteira:any=[];
  nomeCarteira:string='';
  descricaoCarteira:string='';
  totalDigital:any='';
  totalFisico:any='';

  constructor(public navCtrl: NavController, public navParams: NavParams,private carteiraProvider:CarteiraProvider,private dadosGeraisProvider:DadosGeraisProvider,private viewCtrl:ViewController) {
    this.loadCarteiras();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarteiraPage');
  }

    
  loadCarteiras(){
    this.carteiraProvider.GetCarteiras().subscribe(result=>{
      this.listaCarteira=result;
      console.log("obter carteiras",result);
    })
  }

  addCarteira(){
    this.carteiraProvider.PostCarteira(this.nomeCarteira,this.descricaoCarteira,this.totalDigital,this.totalFisico).subscribe(result=>{
      //meter aqui um toast de sucesso ou erro
      this.loadCarteiras();
    })
  }

  updateCarteira(carteira:any){
    this.carteiraProvider.PutCarteira(carteira.id,carteira.nome,carteira.descricao,carteira.totalDigital,carteira.totalFisico).subscribe(result=>{
      //meter um toast de sucesso quando o guardar corre mal e um para corre bem
      this.loadCarteiras();
    })
  }

  deleteCarteira(idCarteira){
    this.carteiraProvider.DeleteCarteira(idCarteira).subscribe(result=>{
      //meter um toast de sucesso quando o guardar corre mal e um para corre bem
      this.loadCarteiras();
    })
  }

  selectCarteira(carteira){
    console.log("carteira selected",carteira);
    this.dadosGeraisProvider.setidCarteiraEmUso(carteira.id);
    this.dadosGeraisProvider.setCarteiraEmUso(carteira);
    this.viewCtrl.dismiss();
  }
  showCategorias(){
    this.navCtrl.push(CategoriasPage);
  }

}
