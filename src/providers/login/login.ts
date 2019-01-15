import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosGeraisProvider } from '../dados-gerais/dados-gerais';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};

const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient,private dadosGeraisProvider:DadosGeraisProvider) {
    console.log('Hello LoginProvider Provider');
  }

  //producao
  private apiUrlOauth='https://bo.evolutionleap.eu/token';
  private apiUrl="http://localhost:61967/api/" + "login/";

  handleError(error: Response | any) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    console.error('It happens: ', error);
  }

  loginTokenOauth(username,password){
    const body = new HttpParams()
    .set("grant_type","password")
    .set('username', username)
    .set('password', password);
    return this.http.post(this.apiUrlOauth,body.toString(),httpOptions);

  }

  MakeLogin(loginObject){
    return this.http.post(this.apiUrl+"makelogin",loginObject,httpOptionsJson);
  }

 
}
