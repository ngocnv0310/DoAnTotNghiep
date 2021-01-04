import { NhatuyendungService } from './../../../services/nhatuyendung.service';
import { TintuyendungService } from './../../../services/tintuyendung.service';
import { ROOT_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { UngtuyenService } from './../../../services/ungtuyen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vieclamdaluu',
  templateUrl: './vieclamdaluu.component.html',
  styleUrls: ['./vieclamdaluu.component.css']
})
export class VieclamdaluuComponent implements OnInit {

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
    this.danhsachtin=[];
    this._luuCvService.getVieclamLuutheoUngvien(+localStorage.getItem('idUser')).subscribe(data => {
      this.tintuyendung = data;
      for(let x of this.tintuyendung){
        this._tin.getChitiettintuyendung(x.idTintuyendung).subscribe( a=> {
          let rs = a[0];
          this._nhatuyendungService.getChitietNTD(a[0].idNhatuyendung).subscribe(value => {
            rs.logo = value[0].logo;
            this.danhsachtin.push(rs);
            console.log(this.danhsachtin)
          })
        })
      }
      console.log(this.tintuyendung)
    })
  }

  XoaData(item){
    if(confirm("Bạn có muốn xóa tin "+item.tieude)){
      this._luuCvService.XoaLuucongviec(+localStorage.getItem('idUser'),+item.idTintuyendung).subscribe(data => {
        console.log(data);
        alert('Bạn đã xóa thành công');
        this.loadData();
      })
    }else{
    
    }
  }

  
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }


}
