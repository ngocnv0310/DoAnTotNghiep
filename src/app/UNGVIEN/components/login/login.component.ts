import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IsLogin, Ungvien } from 'src/app/UNGVIEN/models/ungvien.class'
import { ROOT_URL } from 'src/environments/environment';
import { LoginService } from '../../services/login.service';
import { ResponeResult } from 'src/app/UNGVIEN/models/ResponeResult.class'
import { Router } from '@angular/router';
import { UngvienService } from '../../services/ungvien.service';

import { 
  AuthService ,
  FacebookLoginProvider, 
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialUser
} from 'ng-social-login-module';
 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error: string;
  public email: string = 'user@gmail.com';
  public matkhau: string = 'admin';
  public isLoginfalse = false;
  constructor(
    public _loginservice: LoginService,
    public _ungvienService: UngvienService,
    public _routerService: Router,
    public http: HttpClient,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user)
      if(user){
        // this._routerService.navigate(['/'])
        this.http.post<ResponeResult>("https://localhost:44309/api/LoginSocial",user).subscribe(data =>{
          this.signOut();
          if(data.isOk){
            console.log(data.repData[0].email,data.repData[0].matkhau)
            this.LoginVip(data.repData[0].email,data.repData[0].matkhau);
          }else{
            alert(data.messageText);
          }
          console.log(data)
        })
      }
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signInWithLinkedIN(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

  user: SocialUser;
  private loggedIn: boolean;


  clicked = false;

  LoginVip(email,matkhau){
    this._loginservice.checkLogin(email,matkhau).pipe().subscribe(data => {
      console.log(data.isOk);
      if (data === undefined || !data.isOk) {
        this.isLoginfalse = true;
        this.loading = false;
      } else {
        localStorage.setItem('idUser', data.repData[0].idUngvien);
        localStorage.setItem('firstLogin', 'true');
        if (localStorage.getItem('urlVitri')) {
          this._routerService.navigate(['/' + localStorage.getItem('urlVitri')])
            .then(() => {
              localStorage.removeItem('urlVitri');
              window.location.reload();
            });
        }
        else {
          this._routerService.navigate(['/'])
            .then(() => {
              window.location.reload();
            });
        }

      }
    });
  }
  
  login(email, pass) {
    this.clicked = true;
    if (email.valid && pass.valid) {
      this.LoginVip(this.email,this.matkhau);
    }
  }
}
