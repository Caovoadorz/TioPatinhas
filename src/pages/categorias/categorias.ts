import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private categoriasProvider:CategoriasProvider) {
    this.loadCategorias();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');

  }
  categoriasList:any=[];
  descricaoCategoria:any='';
  nomeCategoria:any='';
  idCategoria:any=null;

  errorMessage:any='';
  hasError:boolean=false;

  loadCategorias(){
    this.categoriasProvider.GetCategorias().subscribe(result=>{
      this.categoriasList=result;
      console.log("resultado das categorias",this.categoriasList)
    },error=>{
      console.error("erro nas categorias",error);
    });
  }

  saveCategoria(){
    if(this.nomeCategoria=="" || this.nomeCategoria==undefined) return;
    if(this.descricaoCategoria==undefined)this.descricaoCategoria=null;
    this.categoriasProvider.PostCategoria(this.nomeCategoria,this.descricaoCategoria).subscribe(result=>{
      this.loadCategorias();
    },error=>{
      console.error("erro ao salvar a categoria",error);
      this.errorMessage=error.error.Message;
      this.hasError=true;
    });
  }

  deleteCategoria(id){
    this.categoriasProvider.DeleteCategoria(id).subscribe(result=>{
      this.loadCategorias();
    })
  }

  Limpar(){
    this.descricaoCategoria=null;
    this.nomeCategoria=null;
    this.idCategoria=null;
  }
}
