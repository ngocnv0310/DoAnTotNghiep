import { TintuyendungService } from './../../../services/tintuyendung.service';
import { NhatuyendungService } from './../../../services/nhatuyendung.service';
import { HttpClient } from '@angular/common/http';
import { UngtuyenService } from './../../../services/ungtuyen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vieclamdaungtuyen',
  templateUrl: './vieclamdaungtuyen.component.html',
  styleUrls: ['./vieclamdaungtuyen.component.css']
})
export class VieclamdaungtuyenComponent implements OnInit {

  constructor(
    public _luuCvService:UngtuyenService,
    public _nhatuyendungService: NhatuyendungService,
    public _tin:TintuyendungService,
    public http:HttpClient,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  danhsachtin=[];
  tintuyendung = [];
  loadData(){
    this._luuCvService.getVieclamungtuyen(+localStorage.getItem('idUser')).subscribe(data => {
      this.tintuyendung = data
      for(let x of this.tintuyendung){
        this._tin.getChitiettintuyendung(x.idTintuyendung).subscribe( a=> {
          let rs = a[0];
          this._nhatuyendungService.getChitietNTD(a[0].idNhatuyendung).subscribe(value => {
            rs.logo = value[0].logo;
            rs.ngayungtuyen = this.ngaydang(x.idTintuyendung);
            this.danhsachtin.push(rs);
            console.log(this.danhsachtin)
          })
        })
      }
      console.log(this.tintuyendung)
    })
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  public ngaydang = (idMa:string) => {
    for(let x of this.tintuyendung){
      if(x.idTintuyendung == idMa){
        return x.ngayungtuyen;
      }
    }
  }

}
