import { ROOT_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UngtuyenService } from './../../../../UNGVIEN/services/ungtuyen.service';
import { Loaicongviec, today } from './../../../../UNGVIEN/models/Base.class';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { NhatuyendungService } from './../../../../UNGVIEN/services/nhatuyendung.service';
import { ThanhphoService } from './../../../../UNGVIEN/services/thanhpho.service';
import { BaseService } from './../../../../UNGVIEN/services/base.service';
import { Component, OnInit } from '@angular/core';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-danhsachungtuyen',
  templateUrl: './danhsachungtuyen.component.html',
  styleUrls: ['./danhsachungtuyen.component.css']
})
export class DanhsachungtuyenComponent implements OnInit {

  constructor(
    public _tintuyendungServices: TintuyendungService,
    public _baseServices: BaseService,
    public _thanhphoService: ThanhphoService,
    public _nhatuyendungService: NhatuyendungService,
    public _ungtuyenService: UngtuyenService,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadData();
    // this.loadList();
    // this.loadModal();
  }

  showdetail = false;
  today = today;

  tintuyendung: Tintuyendung[] = [];
  listLoaicongviec: Loaicongviec[] = [];
  loadData() {
    this._tintuyendungServices.getTintuyendungFromCongty(+localStorage.getItem('idNTD')).subscribe(data => {
      this.tintuyendung = data.sort((a, b) => (a.ngaydang > b.ngaydang) ? -1 : 1);
      var tinhethan = this.tintuyendung.filter(x => {
        if (x.ngayhethan < today) {
          return x.trangthai.toLocaleLowerCase().indexOf(("Đã duyệt").toLocaleLowerCase()) != -1;
        }
      });
      this.tintuyendung = this.tintuyendung.filter(x => {
        if (x.ngayhethan >= today) {
          return x.trangthai.toLocaleLowerCase().indexOf(("Đã duyệt").toLocaleLowerCase()) != -1;
        }
      }).concat(tinhethan);
      for (let x of this.tintuyendung) {
        this._ungtuyenService.getUngvientheoTintuyendung(x.idTintuyendung).subscribe(data => {
          x.soluongungtuyen = data.length;
        })
      }

      this.getthongbao();
    })
    this._baseServices.getAllLoaicongviec().subscribe(data => {
      this.listLoaicongviec = data;
    })

  }

  Xemchitiet(item) {
    console.log(item);
    this._ungtuyenService.getUngvientheoTintuyendung(item.idTintuyendung).subscribe(data => {
      console.log(data);
    })
  }

  thongbao = [];
  getthongbao() {
    this.http.get<[]>(ROOT_URL + 'api/ungtuyens/thongbaoungtuyen/' + localStorage.getItem('idNTD')).subscribe(data => {
      this.thongbao = data.filter(x => {
        return Object(x['dsungtuyen']).length > 0;
      });
      for (let z of this.tintuyendung) {
        z['thongbao'] = false;
        for (let a of this.thongbao) {
          if (z.idTintuyendung == a.idTintuyendung)
            z['thongbao'] = true;
        }
      }
      console.log(this.tintuyendung)
    })
  }

}
