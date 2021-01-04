import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { UngtuyenService } from './../../../../UNGVIEN/services/ungtuyen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { Component, OnInit } from '@angular/core';
import { Ungvien, Kinhnghiem, Bangcap, Ngoaingu } from 'src/app/UNGVIEN/models/ungvien.class';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chitietungvien',
  templateUrl: './chitietungvien.component.html',
  styleUrls: ['./chitietungvien.component.css']
})
export class ChitietungvienComponent implements OnInit {

  showall = false;
  // các dùng chung
  public islogin: boolean = false;
  public user = new Ungvien();
  public ut = new Tintuyendung();
  public kinhnghiems: Kinhnghiem[] = [];
  public bangcaps: Bangcap[] = [];
  public ngoaingus: Ngoaingu[] = [];
  public kynangcanhan:[];

  daluu;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _ungtuyenService: UngtuyenService,
    public _tintuyendung: TintuyendungService,
    public _ungvienService: UngvienService,
    public _baseService: BaseService,
    public _ungtuyen:UngtuyenService,
    public router: Router,
    public location: Location,
    public http: HttpClient
  ) { }

  public ungvien = +this.handleParams();

  handleParams(){
    let id:Number = 0;
    this.activatedRoute.params.subscribe(data =>{
      id= data.id
    })
    return id
  }


  ngOnInit(): void {
    this.loadData();
    this.getInfo()
  }

  lienhe=false;

  //lấy thông tin user
  lastCongviec = new Kinhnghiem();
  getInfo() {
    this._ungvienService.getInfoUngvien(this.ungvien).subscribe(data => {
      this.user = data[0];
      console.log(this.user)
     
    }, erro => {
      this._baseService.handleError(erro);
    })
  }

  public sendEmail = (email) =>{
    return "mailto: " + email;
  }

  luuungvien(){
    if (this.daluu) {
      this._ungtuyen.NTDdeleteUngvien(localStorage.getItem('idNTD'), this.ungvien).subscribe(data => {
        console.log(data);
      })
    } else {
      this._ungtuyen.NTDsaveUngvien(localStorage.getItem('idNTD'), this.ungvien).subscribe(data => {
        console.log(data);
      })
    }
    this.daluu = !this.daluu;
  }

  loadData() {
    this._ungvienService.getKinhnghiemungvien(+this.ungvien).subscribe(data => {
      this.kinhnghiems = data;
      this.lastCongviec = data[data.length-1];
    }, erro => {
      this._baseService.handleError(erro);
    });

    this._ungvienService.Getkynangungvien(+this.ungvien).subscribe(data => {
      this.kynangcanhan = data;
    })

    this._ungvienService.getNgoainguungvien(+this.ungvien).subscribe(data => {
      this.ngoaingus = data
    }, erro => {
      this._baseService.handleError(erro);
    });

    this._ungvienService.getBangcapungvien(+this.ungvien).subscribe(data => {
      this.bangcaps = data;
      console.log(this.bangcaps)
    }, erro => {
      this._baseService.handleError(erro);
    });

    this.http.get('https://localhost:44309/api/luuungviens/'+ localStorage.getItem('idNTD')+'&'+this.ungvien).subscribe(data => {
      this.daluu = data;
      console.log(this.daluu)
    })

  }

  // load image 
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }
  
}
