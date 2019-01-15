import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { DadosGeraisProvider } from '../../providers/dados-gerais/dados-gerais';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private loginProvider:LoginProvider,private dadosGeraisProvider:DadosGeraisProvider,private loadingCtrl:LoadingController){
  // ,private loginAuth:LoginAuthService,private loginGuard:LoginguardGuard,public loginModel:LoginModel,private route:Router) {
  }

  ionViewDidLoad() {
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if(currentUser && (currentUser.token != null)) {
      // this.loginGuard.LoggedIn();
      // this.route.navigate(['/dashboard']);
    }
  }

  isLoading:boolean = false;
  loginError:boolean = false;
  hide = true;
  username: string;
  password: string;
  UserRequired:boolean;
  PassRequired:boolean;
  loader:any;
  // UserNameFormControl= new FormControl('',[
  //   Validators.required
  // ]);

  // PasswordFormControl= new FormControl('',[
  //   Validators.required
  // ]);

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  login():void {
    this.UserRequired=false;
    this.PassRequired=false;
    // if(this.username != null && this.password != null && this.PasswordFormControl.valid && this.UserNameFormControl.valid)
    if(this.username != null && this.password != null)
    {
      this.presentLoading();
      this.loginProvider.loginTokenOauth(this.username,this.password).subscribe(res => {
        console.log("resposta do login",res);
        this.dadosGeraisProvider.setLoginModel(res);
        this.loginProvider.MakeLogin(this.dadosGeraisProvider.getUser()).subscribe(result => {
          this.dadosGeraisProvider.haveLoggedIn(); 
          this.loader.dismiss();
          this.navCtrl.push(HomePage);
        },error=>{
          console.log("erro do login da app",error);
          this.loader.dismiss();
          this.loginError = true;
        });
      },
      error =>{
        console.log("erro do login do oauth",error);
        this.loader.dismiss();
        this.loginError = true;
      });
     
    }
    else{
      if((this.username == "" && this.password == "") || (this.username == "" && this.password == null) || (this.username == null && this.password == null)){
        this.UserRequired=true;
        this.PassRequired=true;
      }     
      else if(this.password == "" || this.password == null) this.PassRequired=true;
        else this.UserRequired=true;
    }
  }

}
