import { ResponeResult } from './../../../UNGVIEN/models/ResponeResult.class';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UngvienService } from './../../../UNGVIEN/services/ungvien.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/UNGVIEN/services/login.service';
import { 
  AuthService ,
  FacebookLoginProvider, 
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialUser
} from 'ng-social-login-module';
 

@Component({
  selector: 'app-login-ntd',
  templateUrl: './login-ntd.component.html',
  styleUrls: ['./login-ntd.component.css']
})
export class LoginNTDComponent implements OnInit {

  loading = false;
  error: string;
  public email: string = 'user111@gmail.com';
  public matkhau: string = '111111';
  public isLoginfalse = false;
  constructor(
    public _loginservice: LoginService,
    public _ungvienService: UngvienService,
    public router: Router,
    public http: HttpClient,
    private authService: AuthService
  ) { }

  
  user: SocialUser;
  private loggedIn: boolean;

  ngOnInit(): void {
    this.loadData();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user)
      if(user){
        // this._routerService.navigate(['/'])
        this.http.post<ResponeResult>("https://localhost:44309/api/LoginSocialNTD",user).subscribe(data =>{
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

  loadData() {
    if (localStorage.getItem('idNTD')) {
      this.router.navigate(['/nhatuyendung/home']);
    }
  }

  clicked=false;

  LoginVip(email,matkhau){
    this._loginservice.NTDLogin(email, matkhau).subscribe(data => {
      console.log(data)
      if (data === undefined || !data.isOk) {
        this.isLoginfalse = true;
        this.loading = false;
      } else {
        localStorage.setItem('idNTD', data.repData[0].idNhatuyendung);
        this.router.navigate(['/nhatuyendung/home']).then(() => {
          window.location.reload();
        });
      }
    })
  }

  login(email, pass) {
    this.clicked = true;
    if (email.valid && pass.valid) {
      this.loading = true;
      this.LoginVip(this.email,this.matkhau);
    }
  }
}