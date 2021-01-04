import { TintuyendungService } from './../../services/tintuyendung.service';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { Nganh } from 'src/app/UNGVIEN/models/Base.class';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NhatuyendungService } from '../../services/nhatuyendung.service';
import { Nhatuyendung } from '../../models/nhatuyendung.class';

@Component({
  selector: 'app-list-congty',
  templateUrl: './list-congty.component.html',
  styleUrls: ['./list-congty.component.css']
})
export class ListCongtyComponent implements OnInit {

  nhatuyendung: Nhatuyendung[] = [];

  constructor(
    public _ntdService: NhatuyendungService,
    public _tintuyendungService: TintuyendungService,
    public base: BaseService,
    public tp: ThanhphoService,
    public router: Router
  ) { }

  nganh: Nganh[] = [];
  khuvuc: Thanhpho[] = [];



  idList: 0;
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.base.getAllNganh().subscribe(data => {
      this.nganh = data
    })
    this.tp.getAllThanhpho().subscribe(data => {
      this.khuvuc = data
    })

    this.getNTD();
    this.getNTDsortByname();
    this.getNTDsortByquymo();
  }

  Xemchitiet(item) {
    console.log(item)
    this.router.navigate(['/congty/chi-tiet-cong-ty/', item.idNhatuyendung])
  }

  Xemntd(item) {
    this.router.navigate(['/congty/chi-tiet-cong-ty/', item.idNhatuyendung])
  }

  // load image 
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  Catdata(mangdanhsach, location) {
    let num = 3;
    let mang = (mangdanhsach.slice(num * (location - 1), num * location));
    return mang;
  }

  //=======================================================
  // đẩy list 1
  getNTDsortByquymo() {
    this._ntdService.getAllnhatuyendung().subscribe(data => {
      this.congtymoi = data.sort((a, b) => (a.quymocongty > b.quymocongty ? -1 : 1));
      this.Congtymoi();
      console.log(this.congtymoi)
    });

  }

  list1 = [];
  congtymoi: Nhatuyendung[] = []
  indexCongtymoi = 1;
  Congtymoi() {
    this.list1 = this.Catdata(this.congtymoi, this.indexCongtymoi);
    console.log('list1')
    console.log(this.list1)
  }



  //=======================================================
  // đẩy list 2

  getNTDsortByname() {
    this._ntdService.getAllnhatuyendung().subscribe(data => {
      this.congty = data.sort((a, b) => (a.luotxem >  b.luotxem ? -1 : 1));
      console.log(this.congty)
      this.onchange();
    });
  }

  list2 = [];
  congty: Nhatuyendung[] = []
  indexlist = 1;
  onchange() {
    this.list2 = this.Catdata(this.congty, this.indexlist);
  }





  //=======================================================
  // đẩy list 3

  getNTD() {
    this._ntdService.getAllnhatuyendung().subscribe(data => {
      this.congtyhot = data;
      for (let z of this.congtyhot) {
        this._tintuyendungService.getTintuyendungFromCongty(z.idNhatuyendung).subscribe(value => {
          z.soluongtin = value.length;
          this.congtyhot.sort((a,b)=>(a.soluongtin > b.soluongtin)?-1:1);
          this.Congtyhot();
        })
      }
    });
  }

  list3 = [];
  congtyhot= []
  indexhot = 1;
  Congtyhot() {
    this.list3 = this.Catdata(this.congtyhot, this.indexhot);
  }


  searchCongty(nganhs, khuvucs, texts) {
    this.router.navigate(["/ungvien/tat-ca-cong-ty/"], { queryParams: { nganh: nganhs ? nganhs : '', khuvuc: khuvucs ? khuvucs : '', text: texts ? texts : '' } });
    //{ queryParams:{ungvien:item.idUngvien ? item.idUngvien : '',tintuyendung:this.handleParams() ? this.handleParams():''}});

  }
}
