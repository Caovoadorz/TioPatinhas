import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosGeraisProvider } from '../dados-gerais/dados-gerais';

/*
  Generated class for the TransacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class TransacaoProvider {

  constructor(public http: HttpClient,private dadosGeraisProvider:DadosGeraisProvider) {
    console.log('Hello TransacaoProvider Provider');
  }
  urlBase:any= this.dadosGeraisProvider.getUrlBase() + "transacao/" ;

  GetTransacao(idCarteira,idTransacao){
    return this.http.get(this.urlBase+"?idCarteira="+idCarteira+"&idTransacao="+idTransacao);
  }

  GetTransacoes(idCarteira){
    return this.http.get(this.urlBase+"?idCarteira="+idCarteira);
  }

  PostTransacao(transacaoObject){   
    return this.http.post<any>(this.urlBase+"inserir",transacaoObject,httpOptions);
  }

  PutTransacao(idTransacao,idCarteira,idCategoria,valorTransacao,descricaoTransacao,dataTransacao){
    let transacaoObject:any={}
    transacaoObject.id=idTransacao;
    transacaoObject.idCarteira=idCarteira;
    transacaoObject.idCategoria=idCategoria;
    transacaoObject.valorTransacao=valorTransacao;
    transacaoObject.descricaoTransacao=(descricaoTransacao || '');
    transacaoObject.dataTransacao=dataTransacao; 
    return this.http.put(this.urlBase,transacaoObject,httpOptions);
  }

  DeleteTransacao(idTransacao){
    return this.http.delete(this.urlBase+idTransacao,httpOptions);
  }
}
