import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Loc, Nganh, Loaicongviec } from 'src/app/UNGVIEN/models/Base.class';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';

@Component({
  selector: 'app-loc',
  templateUrl: './loc.component.html',
  styleUrls: ['./loc.component.css']
})
export class LocComponent implements OnInit {

  @Output('locdulieu') onHandle = new EventEmitter<Loc>();

  loc = new Loc();
  listThanhpho: Thanhpho[] = [];
  listNganh: Nganh[] = [];
  listLoaicongviec: Loaicongviec[] = [];
  listLuong = [
    {
      value: 3000000
    },
    {
      value: 5000000
    },
    {
      value: 7000000
    },
    {
      value: 10000000
    },
    {
      value: 15000000
    },
    {
      value: 20000000
    },
    {
      value: 30000000
    },
    {
      value: 50000000
    }
  ]


  constructor(
    public _baseService: BaseService,
    public _ungvienService: UngvienService,
    public _thanhphoService: ThanhphoService,
  ) { }



  ngOnInit(): void {
    this.load();
    this.loadAlldata();
  }

  loadAlldata() {
    this._baseService.getAllNganh().subscribe(data => {
      this.listNganh = data;
    }, erro => {
      console.log(this._baseService.handleError(erro))
    })
    this._baseService.getAllLoaicongviec().subscribe(data => {
      this.listLoaicongviec = data
    }, erro => {
      console.log(this._baseService.handleError(erro))
    })
    this._thanhphoService.getAllThanhpho().subscribe(data => {
      this.listThanhpho = data
    }, erro => {
      console.log(this._baseService.handleError(erro))
    })
  }

  load() {
    this.loc.nganhnghe = 0;
    this.loc.thanhpho = 0;
    this.loc.minluong = 0;
    this.loc.loaicongviec = 0;
    this.loc.capbac = null;
  }

  onSearch() {
    this.loc.nganhnghe*=1;
    this.loc.thanhpho*=1;
    this.loc.minluong*=1;
    this.loc.loaicongviec*=1;
    this.onHandle.emit(this.loc);
  }

  onReset() {
    this.load();
    this.onSearch();
  }

}
