import { ROOT_URL } from './../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UngvienService } from './../../../services/ungvien.service';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';
import { Boloc, today } from './../../../models/Base.class';
import { Nganh } from 'src/app/UNGVIEN/models/Base.class';
import { Capbac, Luong } from './../../../models/dataDropdown';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { Component, OnInit } from '@angular/core';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { Router, ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';
import { $ } from 'protractor';

@Component({
  selector: 'app-vieclam-list',
  templateUrl: './vieclam-list.component.html',
  styleUrls: ['./vieclam-list.component.css']
})
export class VieclamListComponent implements OnInit {

  listTintuyendungs = [];
  listThanhpho: Thanhpho[] = [];
  listNganh: Nganh[] = [];
  capbac = Capbac;

  savelist = [];

  public nameproduct: string;
  public priceproduct: number;
  public statusproduct: boolean;
  public phucloi = [];

  public boloc = new Boloc();
  constructor(
    public _tpService: ThanhphoService,
    public _tintuyendungService: TintuyendungService,
    public _uv: UngvienService,
    public _nhatuyendungService: NhatuyendungService,
    public _routerService: Router,
    public activatedRoute: ActivatedRoute,
    public _base: BaseService,
    public router: Router,
    public http: HttpClient
  ) { }

  pageNumber = 1;
  pageSize = 20;
  totalPage = 0;
  soluong = 0;

  textNull ="";

  queryString: string = "";

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data)
      if (data['congviec']) {
        this.queryString = data['congviec'];
      }
      if (data['nganh']) {
        this.boloc.idNganh = +data['nganh']
      }
      if (data['thanhpho']) {
        this.boloc.idThanhpho = +data['thanhpho']
      }
      if (data['mucluong']) {
        this.boloc.luong = +data['mucluong']
      }
      this.Getboloc();
    });
    this.loadData();

  }


  chuyentrang(item) {
    if (item <= this.totalPage && item != this.pageNumber) {
      this.pageNumber = item;
      console.log(item)
      this.Getboloc();
    }
  }



  loadData() {
    this._base.getAllphucloi().subscribe(data => {
      this.phucloi = data.slice(0, data.length - 1);
    });
    this._base.getAllNganh().subscribe(data => {
      this.listNganh = data;
    });
    this._tpService.getAllThanhpho().subscribe(data => {
      this.listThanhpho = data;
    });

  }

  sortLuong = false;

  Getboloc() {
    var id = localStorage.getItem('idUser') ? localStorage.getItem('idUser') : 0;
    var chuoiSearch ="idUngvien=" + id + "&idThanhpho=" + this.boloc.idThanhpho + "&idNganh=" + this.boloc.idNganh + "&pagesize=" + this.pageSize + "&  =" + id + "&pagenum=" + this.pageNumber + "&luong=" + this.sortLuong;
    if(this.boloc.luong>0){
      var abc = this.listLuong.filter(x => {
        return x.id == this.boloc.luong;
      })
      chuoiSearch += "&minluong="+abc[0].min+"&maxluong="+abc[0].max
    }
    if(this.boloc.capbac=="Quản lý"){
      chuoiSearch += "&chucvu=Quản%20lý"
    }
    if(this.queryString){
      chuoiSearch+="&stringSearch="+this.queryString;
    }
    console.log(chuoiSearch);
    //get số lượng 
    this.http.get('https://localhost:44309/api/dangtintuyendungs/soluong?'+chuoiSearch).subscribe(data => {
    this.soluong = +data;  
    this.totalPage = Math.ceil(+data/this.pageSize) ;
      console.log(this.totalPage);
    })
    //get số data
    this._tintuyendungService.OnseachCongviec(chuoiSearch).subscribe(data => {
      this.listTintuyendungs = data;
      if (localStorage.getItem('idUser')) {

        for (let i of this.listTintuyendungs) {
          this.http.get<[]>(ROOT_URL + "api/luucongviecs/" + i.idTintuyendung + "&" + localStorage.getItem('idUser')).subscribe(datas => {
            i['luucongviec'] = datas;
          }, err => {
            console.log(this._base.handleError(err));
          });
        }
        // });
      } else {
        for (let i of this.listTintuyendungs) {
          i['luucongviec'] = false;
        }
      }
      console.log(this.listTintuyendungs);
    });
  }

  sapxep = 1;
  sortArr(item) {
    this.sapxep = item;
    if (item == 1) {
      this.sortLuong=false;
      this.Getboloc();
    } else if (item == 2) {
      this.sortLuong=true;
      this.Getboloc();
    }
  }

  workDetail(value) {
    console.log(value)
    this._routerService.navigate(['/ungvien/vieclam/' + value.idTintuyendung])
  }

  listLuong = Luong;


  onSearch() {
    console.log(this.boloc);
    console.log(this.queryString);
    this.router.navigate(['/ungvien/vieclam'], { queryParams: { congviec: this.queryString ? this.queryString : '', nganh: this.boloc.idNganh ? this.boloc.idNganh : '', thanhpho: this.boloc.idThanhpho ? this.boloc.idThanhpho : '', mucluong: this.boloc.luong ? (this.boloc.luong.toString()) : '',chucvu:this.boloc.capbac?this.boloc.capbac:'' } });
  };

  Xoaboloc() {
    this.queryString = "";
    this.boloc = new Boloc();
    this.router.navigate(['/ungvien/vieclam']);

  }


  public getIcon = (serverPath: string) => {
    return `../../../../../assets/image/iconphucloi/${serverPath}.png`;
  }


  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  hover = false;
  onSave(item) {
    if (localStorage.getItem('idUser')) {
      this.http.get<[]>(ROOT_URL + "api/luucongviecs/" + item.idTintuyendung + "&" + localStorage.getItem('idUser')).subscribe(datas => {
        let result = datas;
        if (result) {

          var chuoiSearch = item.idTintuyendung + "&" + localStorage.getItem('idUser');
          this.http.delete(ROOT_URL + "api/luucongviecs/" + chuoiSearch).subscribe(data => {
            item.luucongviec = !item.luucongviec;
          });
        } else {
          const headers = new HttpHeaders().set('content-type', 'application/json');
          const body = { idUngvien: +localStorage.getItem('idUser'), idTintuyendung: item.idTintuyendung, ngayluu: today };
          this.http.post(ROOT_URL + "api/luucongviecs", JSON.stringify(body), { headers, withCredentials: true }).subscribe(data => {
            // this.clicked =data;
            // this.loadData();
            item.luucongviec = !item.luucongviec;
          });
        }
      });
    } else {
      if (confirm('Bạn chưa đăng nhập bạn có muốn đăng nhập để lưu công việc này')) {
        localStorage.setItem('urlVitri', "/ungvien/vieclam/" + item.idTintuyendung);
        this._routerService.navigate(['/dang-nhap-ung-vien']);
      }
    }
  }



  // lưu công việc
  actionMethod() { // lưu công việc
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { idUngvien: +localStorage.getItem('idUser'), idTintuyendung: +localStorage.getItem('job'), ngayluu: today };
    this.http.post(ROOT_URL + "api/luucongviecs", JSON.stringify(body), { headers, withCredentials: true }).subscribe(data => {
      // this.clicked =data;
    });
  }

  oday = true;

}
