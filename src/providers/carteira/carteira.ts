import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosGeraisProvider } from '../dados-gerais/dados-gerais';

/*
  Generated class for the CarteiraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class CarteiraProvider {

  constructor(public http: HttpClient,private dadosGeraisProvider:DadosGeraisProvider) {
    console.log('Hello CarteiraProvider Provider');
  }

  urlBase:any= this.dadosGeraisProvider.getUrlBase() + "carteira/" ;

  GetCarteiras(){
    let tokenUtilizador='admin';//isto vai começar a ser por token de utilizador
    return this.http.get(this.urlBase+"?token="+tokenUtilizador);

  }

  PostCarteira(nomeCarteira,descricaoCarteira,totalDigitalCarteira,totalFisicoCarteira){
    let tokenUtilizador='admin';
    let carteiraObject:any={}
    carteiraObject.token=tokenUtilizador;
    carteiraObject.nome=nomeCarteira;
    carteiraObject.descricao=(descricaoCarteira || '');
    carteiraObject.totalDigital=(totalDigitalCarteira || '');
    carteiraObject.totalFisico=(totalFisicoCarteira || ''); 
    return this.http.post<any>(this.urlBase+"inserir",carteiraObject,httpOptions);
  }

  PutCarteira(idCarteira,nomeCarteira,descricaoCarteira,totalDigitalCarteira,totalFisicoCarteira){
    let tokenUtilizador='admin';
    let carteiraObject:any={}
    carteiraObject.id=idCarteira;
    carteiraObject.token=tokenUtilizador;
    carteiraObject.nome=nomeCarteira;
    carteiraObject.descricao=(descricaoCarteira || '');
    carteiraObject.totalDigital=(totalDigitalCarteira || '');
    carteiraObject.totalFisico=(totalFisicoCarteira || ''); 
    return this.http.put(this.urlBase,carteiraObject,httpOptions);
  }

  DeleteCarteira(idCarteira){
    return this.http.delete(this.urlBase+idCarteira,httpOptions);
  }
}
