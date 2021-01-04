import { Router } from '@angular/router';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { Capbac } from './../../../models/dataDropdown';
import { BaseService } from './../../../services/base.service';
import { UngvienService } from './../../../services/ungvien.service';
import { ThanhphoService } from './../../../services/thanhpho.service';
import { Congviecmongmuon } from './../../../models/Base.class';
import { HttpClient } from '@angular/common/http';
import { UngtuyenService } from './../../../services/ungtuyen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thongbaovieclam',
  templateUrl: './thongbaovieclam.component.html',
  styleUrls: ['./thongbaovieclam.component.css']
})
export class ThongbaovieclamComponent implements OnInit {


  constructor(
    public _thanhphoService: ThanhphoService,
    public _ungvienService: UngvienService,
    public _baseService: BaseService,
    public router:Router,
    private http: HttpClient
  ) { }

  public show: boolean = false;

  ngOnInit(): void {
    this.loadCongviecmongmuon();
  }

  public capbac = Capbac;
  //======================================================
  //công việc mong muốn

  listCVungvien = [];
  loadCongviecmongmuon() {
    this._ungvienService.getCongviecmongmuontheoUV(localStorage.getItem('idUser')).subscribe(data => {
      this.listCVungvien = data;
      for (let item of this.listCVungvien) {
        this._ungvienService.GetnoilamviectheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(dt => {
          item.thanhpho = dt;
        })
        this._ungvienService.GetnganhnghetheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(dt => {
          item.nganhnghe = dt;
        })
      }
    })

  }

  public CustomString = (arr: [], ten: string) => {
    let chuoi = "";
    if (arr) {
      for (let i of arr) {
        chuoi += i[ten] + ", ";
      }
    }
    return chuoi.slice(0, chuoi.length - 2)
  }

  element: HTMLElement;
  onData(value) {
    console.log(value)
    if (value) {
      this.loadCongviecmongmuon()
      this.element = document.getElementById('dong') as HTMLElement;
      this.element.click();
      alert('Đã tạo');
      window.location.reload();
    }
    else {
      this.element = document.getElementById('dong') as HTMLElement;
      this.element.click();
    }
  }

  Xemviec(item){
    console.log(item);
    let string= item.tenvieclam;
    let nganh=item.nganhnghe[0].idNganh;
    let thanhpho=item.thanhpho[0].idThanhpho;
    console.log(string,nganh,thanhpho)
    this.router.navigate(['/ungvien/vieclam'],{ queryParams:{congviec:string ? string : '',nganh:nganh ? nganh:'',thanhpho:thanhpho?thanhpho:''}});
  }


  XoaCongviecmongmuon(item) {
    // Xóa nơi làm việc
    this._ungvienService.GetnoilamviectheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(
      data => {
        if (data.length > 0) {
          this._ungvienService.DeletenoilamviectheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(data => {
            console.log('đã xóa');
          })
        }
        // xóa ngành
        this._ungvienService.GetnganhnghetheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(
          data => {
            if (data.length > 0) {
              this._ungvienService.DeleteNganhnghemongmuon(item.idCongviecmongmuon).subscribe(data => {
                console.log('đã xóa');
                this._ungvienService.DeleteCongviecmongmuon(item.idCongviecmongmuon).subscribe(data => {
                  this.loadCongviecmongmuon();
                });
              })
            }
            else {
              this._ungvienService.DeleteCongviecmongmuon(item.idCongviecmongmuon).subscribe(data => {
                this.loadCongviecmongmuon();
              });
            }
          }
        );
      }
    );
  }
}
