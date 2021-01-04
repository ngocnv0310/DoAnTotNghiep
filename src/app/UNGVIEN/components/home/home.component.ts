import { Congviecmongmuon } from './../../models/Base.class';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { Router } from '@angular/router';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { Component, OnInit } from '@angular/core';
import { Nhatuyendung } from '../../models/nhatuyendung.class';
import { Tintuyendung } from '../../models/tintuyendung.class';
import { queue } from 'rxjs/internal/scheduler/queue';
import { query } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public _ntdService: NhatuyendungService,
    public _ttdService: TintuyendungService,
    public _uvService: UngvienService,
    public router: Router,
  ) { }

  congviecmogmuon: any;

  ngOnInit(): void {
    this.loadData();
  }



  indexlist = 1;
  onchange() {
    this.loadData2()
  }
  listTest = [];
  loadData2() {
    let num = 8;
    this.listTest = (this.vieclam.slice(num * (this.indexlist - 1), num * this.indexlist));
    console.log(this.listTest);
  }

  congtynoibat = [];
  vieclam = [];
  loadData() {

    this._ntdService.getAllnhatuyendung().subscribe(data => {
      this.congtynoibat = data.sort((a,b)=>(a.luotxem > b.luotxem)? -1:1);
      this.congtynoibat = this.congtynoibat.slice(0,5);
    });



    this._ttdService.getAllTintuyendung(localStorage.getItem('idUser')).subscribe(data => {
      console.log(data)
      this.vieclam = data.filter(x=>{
        return x.trangthai.toLocaleLowerCase().indexOf(("Đã duyệt").toLocaleLowerCase()) != -1;
      });
      
      this.loadData2();
     
    })
    this.getVieclamgoiy();
    

  }
  getVieclamgoiy() {
    if (localStorage.getItem('idUser') == null) {
      console.log('chưa đăng nhập')
      console.log(this.vieclam);
    } else {
      console.log('đã đăng nhập')
      console.log(this.vieclam);
      this._uvService.getCongviecmongmuontheoUV(localStorage.getItem('idUser')).subscribe(data => {
        console.log(data)
        if (data.length > 0) {
          this.loadData2();
        } else {
          if (localStorage.getItem('firstLogin'))
            this.runpopup();
          localStorage.removeItem('firstLogin')
        }

      })
    }

  }


  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  Xemntd(item) {
    this.router.navigate(['/congty/chi-tiet-cong-ty/', item.idNhatuyendung])
  }


  dataslide2 = 1;
  changeData2($value) {
    this.dataslide2 = $value + 1
  }

  pre() {
    if ((this.dataslide2 - 2) >= 0) {
      this.changeData2(this.dataslide2 - 2);
    } else {
      this.changeData2(5);
    }

  }

  next() {
    if ((this.dataslide2) < 6) {
      this.changeData2(this.dataslide2);
    } else {
      this.changeData2(0);
    }
  }

  element: HTMLElement;
  //tạo popup khi chưa có gợi ý thông báo tìm việc
  runpopup() {
    this.element = document.getElementById('idload') as HTMLElement;
    this.element.click();
  }

  Getdataoutput() {

  }

  onData(value) {
    console.log(value)
    if (value) {
      alert('Đã tạo thông báo việc làm');
      this.element = document.getElementById('dong') as HTMLElement;
      this.element.click();
    }
    else {
      this.element = document.getElementById('dong') as HTMLElement;
      this.element.click();
    }
  }

  //======================================================
  //công việc mong muốn
  //===================================================


  addTP(item) {
    for (let i of this.listTP) {
      if (item.idThanhpho == i.idThanhpho) {
        return;
      }
    }
    this.listTP.push(item);
    console.log(this.listTP)
  }

  remove(item) {
    this.listTP.splice(item, 1);
    console.log(this.listTP);
  }
  addNganh(item) {
    for (let i of this.dsNganh) {
      if (item.idNganh == i.idNganh) {
        return;
      }
    }
    this.dsNganh.push(item);
    console.log(this.dsNganh)
  }

  removeNganh(item) {
    this.dsNganh.splice(item, 1);
    console.log(this.dsNganh);
  }
  dsNganh = [];
  listTP = [];


  congviecmongmuon = new Congviecmongmuon();
  submitCongviec() {
    this.congviecmongmuon.idUngvien = +localStorage.getItem('idUser');
    this.congviecmongmuon.idLoaicongviec = +this.congviecmongmuon.idLoaicongviec;
    this.congviecmongmuon.idNganh = +this.congviecmongmuon.idNganh;
    this.congviecmongmuon.luong = +this.congviecmongmuon.luong;

    this._uvService.CreateCongviecmongmuon(this.congviecmongmuon).subscribe(data => {
      this.congviecmongmuon = data;
      console.log(this.congviecmongmuon);
      for (let i = 0; i < this.listTP.length; i++) {
        // add ngành mới tại đây
        this._uvService.CreateKhuVucmongmuon(this.listTP[i].idThanhpho, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
          console.log(data);
        })
      }
      for (let i = 0; i < this.dsNganh.length; i++) {
        // add ngành mới tại đây
        this._uvService.CreateNganhnghemongmuon(this.dsNganh[i].idNganh, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
          console.log(data);
        })
      }
    });
  }


  SearchCongviec(item){
    this.router.navigate(["/ungvien/vieclam"],{ queryParams:{congviec:item ? item : ''}});
  }
}

