import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { ROOT_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Nhatuyendung } from 'src/app/UNGVIEN/models/nhatuyendung.class';

@Component({
  selector: 'app-header-ntd',
  templateUrl: './header-ntd.component.html',
  styleUrls: ['./header-ntd.component.css']
})
export class HeaderNTDComponent implements OnInit {

  constructor(
    public nhatuyendungService: NhatuyendungService,
    public _router:Router,
    public http:HttpClient
  ) { }
  public islogin :boolean = false;

  ngOnInit(): void {
    this.loaddata();
    this.getthongbao();
  }


  ntd:Nhatuyendung = new Nhatuyendung();


  loaddata(){
    if(localStorage.getItem('idNTD') == null){
      this.islogin = false;
    }else{
      this.islogin = true;
    }

    this.nhatuyendungService.getChitietNTD(+localStorage.getItem('idNTD')).subscribe(data => {
      this.ntd = data[0];
    })
  };
 
  logout(){
    this.islogin = false
      localStorage.removeItem('idNTD');
      this._router.navigate(['/nhatuyendung']).then(() => {
        window.location.reload();
      });;
  }

  getthongbao(){
    this.http.get<[]>(ROOT_URL+'api/ungtuyens/thongbaoungtuyen/'+localStorage.getItem('idNTD')).subscribe(data => {
      this.thongbao = data.filter(x => {
        return Object(x['dsungtuyen']).length > 0;
      });
      // this.thongbao = this.thongbao.fillter
      console.log(this.thongbao);
    })
  }

  Xemthongbao(item){
    this._router.navigateByUrl('/nhatuyendung/home/thong-tin/chi-tiet-ung-tuyen/'+ item).then(
      () => {
        location.reload();
      }
    );
    // [routerLink]="['/nhatuyendung/home/thong-tin/chi-tiet-ung-tuyen',item.idTintuyendung]"
  }

  thongbao : any;
}
