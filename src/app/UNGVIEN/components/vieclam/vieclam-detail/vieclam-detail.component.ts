import { today } from './../../../models/Base.class';
import { ROOT_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UngtuyenService } from './../../../services/ungtuyen.service';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
@Component({
  selector: 'app-vieclam-detail',
  templateUrl: './vieclam-detail.component.html',
  styleUrls: ['./vieclam-detail.component.css']
})
export class VieclamDetailComponent implements OnInit {

  step = 'step1';
  clicked: any = false;
  isUngtuyen: any = false;
  public number: Number = 1;
  constructor(
    public activatedRoute: ActivatedRoute,
    public _tintuyendungService: TintuyendungService,
    public _nhatuyendungService: NhatuyendungService,
    public _luuCVService: UngtuyenService,
    public _routerService: Router,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.number =1;
    localStorage.setItem('job', this.handleParams().toString());
    this.step = 'step1';
    this.loadData();
    this.LoadLuuCV();
  }

  tintuyendung: any;
  handleParams() {
    let id: Number = 0;
    this.activatedRoute.params.subscribe(data => {
      id = data.id
    })
    return id
  }

  LoadLuuCV() {
    var user = localStorage.getItem('idUser');
    var tin = localStorage.getItem('job');
    console.log("user:" + user, "tin:" + tin);
    this._luuCVService.getLuuCV(+user, +tin).subscribe(data => {
      this.clicked = data;
      console.log(data);
    })
    this._luuCVService.getUngtuyen(+user, +tin).subscribe(data => {
      this.isUngtuyen = data;
      console.log(data);
    })

  }

  loadData() {
    let id: Number = this.handleParams();
    this._tintuyendungService.getChitiettintuyendung(id).subscribe(data => {
      this.tintuyendung = data[0];
      this._nhatuyendungService.getChitietNTD(this.tintuyendung.idNhatuyendung).subscribe(value => {
        this.tintuyendung.logo = value[0].logo;
        console.log(this.tintuyendung.logo);
      })
    })
  }

  actionMethod() { // lưu công việc
    if (localStorage.getItem('idUser')) {
      const headers = new HttpHeaders().set('content-type', 'application/json');
      const body = { idUngvien: +localStorage.getItem('idUser'), idTintuyendung: +localStorage.getItem('job'), ngayluu: today };
      this.http.post(ROOT_URL + "api/luucongviecs", JSON.stringify(body), { headers, withCredentials: true }).subscribe(data => {
        this.clicked = data;
      });
    } else {
      if (confirm('Bạn chưa đăng nhập bạn có muốn đăng nhập để ứng tuyển công việc này')) {
        localStorage.setItem('urlVitri', "/ungvien/vieclam/" + this.tintuyendung.idTintuyendung);
        this._routerService.navigate(['/dang-nhap-ung-vien']);
      }
    }

  }

  Ungtuyen() {
    if (localStorage.getItem('idUser')) {
      if (confirm("Bạn muốn ứng tuyển vào vị trí " + (this.tintuyendung.tieude).toUpperCase() + " \nNhà tuyển dụng có thể xem thông tin của bạn")) {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        const body = { idUngvien: +localStorage.getItem('idUser'), idCongviec: +localStorage.getItem('job'), ngayungtuyen: today };
        console.log(JSON.stringify(body));
        this.http.post(ROOT_URL + "api/ungtuyens", JSON.stringify(body), { headers, withCredentials: true }).subscribe(data => {
          this.isUngtuyen = data;
          if (this.isUngtuyen) {
            if (this.clicked) {
              this._luuCVService.XoaLuucongviec(+localStorage.getItem('idUser'), +localStorage.getItem('job')).subscribe(data => {

              });
            }
          }
        });
      }
    } else {
      if (confirm('Bạn chưa đăng nhập bạn có muốn đăng nhập để ứng tuyển công việc này')) {
        localStorage.setItem('urlVitri', "/ungvien/vieclam/" + this.tintuyendung.idTintuyendung);
        this._routerService.navigate(['/dang-nhap-ung-vien']);
      }
    }


  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }


}
