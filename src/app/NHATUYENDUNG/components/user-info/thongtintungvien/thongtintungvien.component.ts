import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { NgoaiNguBase } from 'src/app/UNGVIEN/models/Base.class';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { UngtuyenService } from './../../../../UNGVIEN/services/ungtuyen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ungvien, Kinhnghiem, Bangcap, Ngoaingu, Trinhdo } from 'src/app/UNGVIEN/models/ungvien.class';

@Component({
  selector: 'app-thongtintungvien',
  templateUrl: './thongtintungvien.component.html',
  styleUrls: ['./thongtintungvien.component.css']
})
export class ThongtintungvienComponent implements OnInit {

  showall = false;
  lienhe=false;
  // các dùng chung
  public islogin: boolean = false;
  public user = new Ungvien();
  public ut = new Tintuyendung();
  public kinhnghiems: Kinhnghiem[] = [];
  public bangcaps: Bangcap[] = [];
  public ngoaingus: Ngoaingu[] = [];


  constructor(
    public activatedRoute: ActivatedRoute,
    public _ungtuyenService: UngtuyenService,
    public _tintuyendung: TintuyendungService,
    public _ungvienService: UngvienService,
    public _baseService: BaseService,
    public router: Router,
  ) { }

  public ungvien = 0;
  public tintuyendung = 0;
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(data => {
      this.ungvien = +data['ungvien'];
      this.tintuyendung = +data['tintuyendung'];
      console.log(this.ungvien,this.tintuyendung)
    })
    this.loadData();
    this.getInfo()
  }

  //lấy thông tin user
  getInfo() {
    this._ungvienService.getInfoUngvien(this.ungvien).subscribe(data => {
      this.user = data[0];
      
    }, erro => {
      this._baseService.handleError(erro);
    })

    this._tintuyendung.getChitiettintuyendung(this.tintuyendung).subscribe(data => {
      this.ut = data[0];
    })
  }

  loadData() {
    this._ungvienService.getKinhnghiemungvien(+this.ungvien).subscribe(data => {
      this.kinhnghiems = data;
    }, erro => {
      this._baseService.handleError(erro);
    });


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
  }

  // load image 
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

}
