import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DadosGeraisProvider } from '../../providers/dados-gerais/dados-gerais';
import { TransacaoProvider } from '../../providers/transacao/transacao';
import { CategoriasProvider } from '../../providers/categorias/categorias';

/**
 * Generated class for the TransacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transacao',
  templateUrl: 'transacao.html',
})
export class TransacaoPage {

  valorTransacao:any='';
  categoriasList:any=[];
  dataEscolhida:any = Date.now;
  categoriaSelected:any;

  transacaoObject:any={
    idCarteira:null,
    idCategoria:null,
    valor:null,
    dataTransacao:null,
    descricao:''
  }

  tipoTransacaoSelected:any;


  tipoTransacao:any=[
    {
      id:1,
      nome:'Receber'
    },
    {
      id:2,
      nome:"Pagamento"
    }
  ]

  toastObject:any={
    message:null,
    cssClass:null,
  }

  totalSelected:any=2;

  totaisCarteira:any=[
    {
      id:1,
      nome:'Balanço Digital'
    },
    {
      id:2,
      nome:'Balanço Fisico'
    }
  ]

  totalFisico:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private categoriaProvider:CategoriasProvider,private dadosGeraisProvider:DadosGeraisProvider,private transacaoProvider:TransacaoProvider,private toastCtrl:ToastController) {
    //this.checkCarteiras();
    this.getCategorias();
    this.transacaoObject.idCarteira = this.dadosGeraisProvider.getidCarteiraEmUso();
    this.tipoTransacaoSelected = 1;
    this.totalFisico = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransacaoPage');
  }

  getCategorias(){
    this.categoriaProvider.GetCategorias().subscribe(result=>{
      this.categoriasList = result;
      console.log("categorias",this.categoriasList)
    })
  }

  guardarTransacao(){
    this.transacaoObject.valor = this.valorTransacao;
    if(this.tipoTransacaoSelected = 1) this.transacaoObject.idCategoria = 1;
    else this.transacaoObject.idCategoria = this.categoriaSelected;
    this.transacaoObject.dataTransacao = this.dataEscolhida;
    this.transacaoObject.idTipoTransacao = this.tipoTransacaoSelected;
    this.transacaoObject.totalSelected = this.totalSelected;
    console.log("transacaoObject a ser guardado")
    this.transacaoProvider.PostTransacao(this.transacaoObject).subscribe(result =>{
      this.toastObject.message = "Transação guardada com sucesso";
      this.toastObject.cssClass= "toastSucess";
      this.presentToastGuardarSucesso();
      this.navCtrl.pop();
    },error=>{
      this.toastObject.message = "Erro ao guardar a transação";
      this.toastObject.cssClass= "toastError";
      this.presentToastGuardarSucesso();
      console.error("erro ao guardar a transacao",error);
    })
  }

  verificaTotal(){
    console.log("esta a bater");
    if(this.valorTransacao > this.totalFisico) this.totalSelected = 1;
    else this.totalSelected = 2;
  }
  presentToastGuardarSucesso(){
    const toast = this.toastCtrl.create({
      message: this.toastObject.message,
      duration: 3000,
      cssClass: this.toastObject.cssClass,
    });
    toast.present();
  }

}
