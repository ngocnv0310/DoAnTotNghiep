import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TintuyendungService } from './../../../services/tintuyendung.service';
import { Thanhpho } from './../../../models/thanhpho';
import { Component, OnInit } from '@angular/core';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';

@Component({
  selector: 'app-vieclamkhuvuc',
  templateUrl: './vieclamkhuvuc.component.html',
  styleUrls: ['./vieclamkhuvuc.component.css']
})
export class VieclamkhuvucComponent implements OnInit {

  //khai báo biến dùng chung

  public listTP=[];

  constructor(
    public tpSV:ThanhphoService,
    public tinSV:TintuyendungService,
    public http:HttpClient,
    public Router:Router,
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.http.get<[]>("https://localhost:44309/api/thanhphoes/soluongtin").subscribe(value => {
      console.log(value);
      this.listTP = value;
    })
  }

  chonTP(item){
    this.Router.navigate(["/ungvien/vieclam?idThanhpho="+item.idThanhpho])
  }



}
