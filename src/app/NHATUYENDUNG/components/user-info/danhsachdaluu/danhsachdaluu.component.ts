import { UngtuyenService } from './../../../../UNGVIEN/services/ungtuyen.service';
import { NhatuyendungService } from './../../../../UNGVIEN/services/nhatuyendung.service';
import { Capbac, Luong, ListKNLV } from './../../../../UNGVIEN/models/dataDropdown';
import { Thanhpho } from './../../../../UNGVIEN/models/thanhpho';
import { ThanhphoService } from './../../../../UNGVIEN/services/thanhpho.service';
import { Boloc, Nganh } from './../../../../UNGVIEN/models/Base.class';
import { ROOT_URL } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UngvienService } from './../../../../UNGVIEN/services/ungvien.service';
import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { Ungvien } from 'src/app/UNGVIEN/models/ungvien.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-danhsachdaluu',
  templateUrl: './danhsachdaluu.component.html',
  styleUrls: ['./danhsachdaluu.component.css']
})
export class DanhsachdaluuComponent implements OnInit {

  listTintuyendungs = [];
  listThanhpho: Thanhpho[] = [];
  listNganh: Nganh[] = [];
  capbac = Capbac;
  public phucloi = [];

  public boloc = new Boloc();

  timungvien = true;

  constructor(
    public _tpService: ThanhphoService,
    public _ungtuyen: UngtuyenService,
    public _ntd: NhatuyendungService,
    public _ungvienService: UngvienService,
    public _baseService: BaseService,
    public activeRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    var aa = [];
    this.activeRoute.queryParams.subscribe(data => {
      console.log(data);
      let a, b, c;
      if (data['nganh']) {
        this.boloc.idNganh = data['nganh'];
      }
      if (data['thanhpho']) {
        this.boloc.idThanhpho = +data['thanhpho'];
      }
    })

    console.log(this.boloc)
    this.LoadThongtinUngvien();
    this.loadData()

    this.LoadThongtinUngvienTheodoi();
  }

  SortDiem(array: []) {

    return array;
  }

  loadData() {
    this._baseService.getAllphucloi().subscribe(data => {
      this.phucloi = data.slice(0, data.length - 1);
    });
    this._baseService.getAllNganh().subscribe(data => {
      this.listNganh = data;
    });
    this._tpService.getAllThanhpho().subscribe(data => {
      this.listThanhpho = data;
    });
  }
  searchString = '';



  sapxep = 1;
  sortArr(item) {
    this.sapxep = item;
    if (item == 1) {
      this.onSave();
    } else {
      this.listUngvien.sort((a, b) => (a.kinhnghiem > b.kinhnghiem) ? -1 : 1);
    }
    console.log(this.listUngvien)
  }

  queryString = "";

  onSave() {
    console.log(this.boloc)
    let stringsearch = "idNhatuyendung=" + localStorage.getItem('idNTD') + "&idThanhpho=" + this.boloc.idThanhpho + "&idNganh=" + this.boloc.idNganh + "&capbac=" + this.boloc.capbac
                        + "&kinhnghiem="+this.boloc.luong;
    console.log(stringsearch);
    this._ungvienService.getUngvienSearch(stringsearch).subscribe(data => {
      console.log(data)
      this.listUngvien = data;
    })
  }

  listKN = ListKNLV;

  public getIcon = (serverPath: string) => {
    return `../../../../../assets/image/iconphucloi/${serverPath}.png`;
  }

  Xoaboloc() {
    this.boloc = new Boloc();
    this.onSave();
  }

  listUngvien: Ungvien[] = [];
  LoadThongtinUngvien() {
    console.log(this.boloc)
    let stringsearch = "idNhatuyendung=" + localStorage.getItem('idNTD') + "&idThanhpho=" + this.boloc.idThanhpho + "&idNganh=" + this.boloc.idNganh + "&capbac=" + this.boloc.capbac;
    console.log(stringsearch);
    this._ungvienService.getUngvienSearch(stringsearch).subscribe(data => {
      console.log(data)
      this.listUngvien = data;
    })
   
  };

  Xoaluu(item){
    this._ungtuyen.NTDdeleteUngvien(localStorage.getItem('idNTD'), item.idUngvien).subscribe(data => {
      console.log(data);
      this.LoadThongtinUngvienTheodoi();
    })
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath == null || serverPath === undefined) {
      serverPath = 'Resources/Images/user.jpg';
    }
    return `https://localhost:44309/${serverPath}`;
  };

  OngetData(value) {
    console.log(value);

  }

  XemCT(item) {
    this.router.navigate(['/nhatuyendung/home/thong-tin/chi-tiet-ung-vien/', item.idUngvien]);
  }


  ungviendaluu = [];
  LoadThongtinUngvienTheodoi() {
    this.http.get<[]>("https://localhost:44309/api/nhatuyendungs/luuungvien/" + localStorage.getItem('idNTD')).subscribe(data => {
      this.ungviendaluu = data;
      console.log(data);
    })
  }

  Luuungvien(item) {
    if (item.daluu) {
      this._ungtuyen.NTDdeleteUngvien(localStorage.getItem('idNTD'), item.idUngvien).subscribe(data => {
        console.log(data);
        this.LoadThongtinUngvienTheodoi();
      })
    } else {
      this._ungtuyen.NTDsaveUngvien(localStorage.getItem('idNTD'), item.idUngvien).subscribe(data => {
        console.log(data);
        this.LoadThongtinUngvienTheodoi();
      })
    }
    item.daluu = !item.daluu;
  }

  public tenthanhpho = (value) => {
    for (let x of this.listThanhpho) {
      if (x.idThanhpho == value)
        return x.tenthanhpho
    }
  }

  public nganhlamviec = (value) => {
    for (let x of this.listNganh) {
      if (x.idNganh == value) {
        return x.tennganh
      }
    }
  }

}
