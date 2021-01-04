import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';
import { Boloc, today } from './../../../models/Base.class';
import { Capbac, Luong } from './../../../models/dataDropdown';
import { Nganh } from 'src/app/UNGVIEN/models/Base.class';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { Router } from '@angular/router';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { Component, OnInit } from '@angular/core';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { ROOT_URL } from 'src/environments/environment';

@Component({
  selector: 'app-vieclamquanly',
  templateUrl: './vieclamquanly.component.html',
  styleUrls: ['./vieclamquanly.component.css']
})
export class VieclamquanlyComponent implements OnInit {


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

  listTintuyendungs = [];
  listThanhpho: Thanhpho[] = [];
  listNganh: Nganh[] = [];
  capbac = Capbac;

  public nameproduct: string;
  public priceproduct: number;
  public statusproduct: boolean;
  public phucloi = [];

  public boloc = new Boloc();
  constructor(
    public router: Router,
    public _tpService: ThanhphoService,
    public _uv: UngvienService,
    public http: HttpClient,
    public _tintuyendungService: TintuyendungService,
    public _nhatuyendungService: NhatuyendungService,
    public _routerService: Router,
    public _base: BaseService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.Getboloc();
  }

  Updateluong(value) {
    console.log(value)
  }
  listLuong = Luong;

  onSearch() {
    console.log(this.boloc);
    console.log(this.queryString);
    this.router.navigate(['/ungvien/vieclam'], { queryParams: { congviec: this.queryString ? this.queryString : '', nganh: this.boloc.idNganh ? this.boloc.idNganh : '', thanhpho: this.boloc.idThanhpho ? this.boloc.idThanhpho : '' } });
  };

  Xoaboloc() {
    this.queryString = "";
    this.boloc = new Boloc();
    this.Getboloc();
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

  pageNumber = 1;
  pageSize = 10;
  totalPage = 0;
  soluong = 0;

  chuyentrang(item) {
    if (item <= this.totalPage && item != this.pageNumber) {
      this.pageNumber = item;
      console.log(item)
      this.Getboloc();
    }
  }


  Xoatext() {
    this.queryString = "";
    this.Getboloc();
  }





  workDetail(value) {
    console.log(value)
    this._routerService.navigate(['/ungvien/vieclam/' + value.idTintuyendung])
  }

  queryString = "";
  sortLuong = false;

  Getboloc() {
    this.sapxep = 1;
    var id = localStorage.getItem('idUser') ? localStorage.getItem('idUser') : 0;
    var chuoiSearch = "idThanhpho=" + this.boloc.idThanhpho + "&idNganh=" + this.boloc.idNganh + "&pagesize=" + this.pageSize + "&  =" + id + "&pagenum=" + this.pageNumber + "&luong=" + this.sortLuong;
    if (this.boloc.luong > 0) {
      var abc = this.listLuong.filter(x => {
        return x.id == this.boloc.luong;
      })
      chuoiSearch += "&minluong=" + abc[0].min + "&maxluong=" + abc[0].max
    }
    if (this.queryString) {
      chuoiSearch += "&stringSearch=" + this.queryString;
    }
    chuoiSearch += "&chucvu=Quản%20lý"
    console.log(chuoiSearch)
    //get số lượng 
    this.http.get('https://localhost:44309/api/dangtintuyendungs/soluong?' + chuoiSearch).subscribe(data => {
      this.soluong = +data;
      console.log(data)
      this.totalPage = Math.ceil(+data / this.pageSize);
      console.log(this.totalPage);
    })
    this._tintuyendungService.OnseachCongviec(chuoiSearch).subscribe(data => {
      this.listTintuyendungs = data;
      if (localStorage.getItem('idUser')) {
        for (let i of this.listTintuyendungs) {
          this.http.get<[]>(ROOT_URL + "api/luucongviecs/" + i.idTintuyendung + "&" + localStorage.getItem('idUser')).subscribe(datas => {
            console.log(datas)
            i['luucongviec'] = datas;
          }, err => {
            console.log(this._base.handleError(err));
          });
        }
      } else {
        for (let i of this.listTintuyendungs) {
          i['luucongviec'] = false;
        }
      }
      console.log(this.listTintuyendungs);
    });
  }

  
  public getIcon = (serverPath: string) => {
    return `../../../../../assets/image/iconphucloi/${serverPath}.png`;
  }



  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  // nút lưu trái tym
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
}
