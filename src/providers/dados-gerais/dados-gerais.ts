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
    localStorage.setItem('currentUser', JSON.stringify({ token:null, username: null}));
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
//****************************************LOGIN ***********************************************/

  token: string;
  token_type: string;
  expires_seconds:number;
  username:string;
  emited_date:Date;
  expires_date:Date;

  isLoggedIn:boolean=false;

  public setLoginModel(resposta):void{
      this.token= resposta.access_token;
      this.token_type=resposta.token_type;
      this.expires_seconds=resposta.expires_in;
      this.username=resposta.userName;

      localStorage.setItem('currentUser', JSON.stringify({ token: this.token, username: this.username}));
  }

  public haveLoggedIn(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    console.log("current user carregado",currentUser);
    if(currentUser.token != "" && currentUser.token !=null) return this.isLoggedIn = true;
    else return false;
  }

  public getUser(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    return currentUser;
  }
  

}
