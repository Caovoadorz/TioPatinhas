import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosGeraisProvider } from '../dados-gerais/dados-gerais';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable()
export class CategoriasProvider {

  
  constructor(public http: HttpClient,private dadosGeraisProvider:DadosGeraisProvider) {
    console.log('Hello CategoriasProvider Provider');
  }

  urlBase = this.dadosGeraisProvider.getUrlBase()+"categorias/";

  GetCategorias(){
    return this.http.get(this.urlBase);
  }

  PostCategoria(nome:string,descricao:string){
    let categoriaObject:any={};
    categoriaObject.nome = nome;
    categoriaObject.descricao = descricao;
    return this.http.post(this.urlBase,categoriaObject,httpOptions);
  }
  
  PutCategoria(idCategoria:string,nome:string,descricao:string){
    let categoriaObject:any = {}
    categoriaObject.nome = nome;
    categoriaObject.descricao = descricao;
    categoriaObject.id = idCategoria;
    return this.http.put(this.urlBase,categoriaObject,httpOptions)
  }

  DeleteCategoria(id){
    return this.http.delete(this.urlBase+id,httpOptions);
  }

}
