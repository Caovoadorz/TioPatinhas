import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private carteiraProvider:CarteiraProvider,private dadosGeraisProvider:DadosGeraisProvider,private viewCtrl:ViewController,private alertCtrl:AlertController,private toastCtrl:ToastController) {
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
      this.presentToast("successToast","Carteira inserida com Sucesso");
      this.loadCarteiras();
    },error =>{
      console.error("Erro ao guardar a carteira",error);
      this.presentToast("errorToast","Erro ao adicionar a carteira");
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


  presentToast(css,message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: css
    });

    toast.present();
  }


  presentAddAlert()
  {
    let alert = this.alertCtrl.create({
      title: '<ion-icon name="add">Adicionar Carteira</ion-icon>',
      cssClass: "addCarteiraAlert",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome da Carteira',
          type:"text"
        },
        {
          name: 'totalDigital',
          placeholder: 'Total Digital'
        },
        {
          name: 'totalFisico',
          placeholder: 'Total Fisico'
        },
        {
          name: 'descricao',
          placeholder: 'Descrição'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Adicionar',
          handler: data => {
            if(data.nome =="") {
              console.log("a carteira tem que ter um nome");
              this.presentToast("errorToast","A carteira tem que ter um nome");
              return false;
            }
            else{
              this.nomeCarteira = data.nome
              this.descricaoCarteira = (data.descricao || '');
              this.totalDigital = (data.totalDigital || 0);
              this.totalFisico = (data.totalFisico || 0);
              this.addCarteira();
            }        
          }
        }
      ]
    });
    alert.present();
  }

  showCategorias(){
    this.navCtrl.push(CategoriasPage);
  }

}
