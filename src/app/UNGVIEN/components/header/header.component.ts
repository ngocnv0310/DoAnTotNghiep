import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  boder = '';
  constructor(
    public _router:Router,
    public _uv:UngvienService
  ) { }
  public islogin :boolean = false;

  ngOnInit(): void {
    this.loaddata();
  }
  name="";
  loaddata(){
    if(localStorage.getItem('idUser') == null){
      this.islogin = false;
    }else{
      this.islogin = true;
      this._uv.getInfoUngvien(+localStorage.getItem('idUser')).subscribe(data => {
        this.name = data[0].ho + data[0].ten;
      })
    }
  };
 
  logout(){
    if(localStorage.getItem('user') === 'null'){
      alert("bạn chưa đăng nhập")
    }else{
      this.islogin = false
      localStorage.removeItem('user');
      localStorage.removeItem('idUser');
      this._router.navigate(['/dang-nhap-ung-vien']).then(() => {
        window.location.reload();
      });;
    }
  }
}
