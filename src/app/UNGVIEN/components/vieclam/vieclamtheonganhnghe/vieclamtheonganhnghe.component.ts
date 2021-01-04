import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vieclamtheonganhnghe',
  templateUrl: './vieclamtheonganhnghe.component.html',
  styleUrls: ['./vieclamtheonganhnghe.component.css']
})
export class VieclamtheonganhngheComponent implements OnInit {


  public listNganh=[];

  constructor(
    public http:HttpClient,
    public Router:Router,
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.http.get<[]>("https://localhost:44309/api/nganhs/getsoluong").subscribe(value => {
      console.log(value);
      this.listNganh = value;
    })
  }

  chonTP(item){
    this.Router.navigate(["/ungvien/vieclam?idNganh="+item.idNganh])
  }



}
