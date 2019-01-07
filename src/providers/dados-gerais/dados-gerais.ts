import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DadosGeraisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DadosGeraisProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DadosGeraisProvider Provider');
    console.log(this.urlEnv['localhost']);
  }
//****************************************************ENPOINT */
  urlEnv = {
    localhost:"http://localhost:61967/api/",
    dev:"",
    prod:"https://tiopatinhas.evolutionleap.eu/api/"
  }

  urlBase = (localStorage.getItem("urlBase") || this.urlEnv.localhost);
  endpointSelected = (localStorage.getItem("endpointSelected") || 'localhost');

  getUrlBase(){
    return this.urlBase;
  }

  getEndPointSelected(){
    return this.endpointSelected;
  }

  setUrlBase(url){
    localStorage.setItem("urlBase",this.urlEnv[url]);
    localStorage.setItem("endpointSelected",url);
    this.urlBase = this.urlEnv[url];
  }

//******************************************************************************************** */

//******************************************OUTROS**************************************************/

  idCarteiraEmUso:any=0;
  carteiraEmUso:any=[];

  setCarteiraEmUso(carteira){
    this.carteiraEmUso = carteira; 
  }

  getCarteiraEmUso(){
    return this.carteiraEmUso;
  }

  setidCarteiraEmUso(idCarteira){
    this.idCarteiraEmUso = idCarteira; 
  }

  getidCarteiraEmUso(){
    return this.idCarteiraEmUso;
  }
}
