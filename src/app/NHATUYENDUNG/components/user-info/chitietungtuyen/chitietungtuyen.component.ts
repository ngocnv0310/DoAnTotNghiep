import { TintuyendungService } from './../../../../UNGVIEN/services/tintuyendung.service';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { Ungvien } from 'src/app/UNGVIEN/models/ungvien.class';
import { UngtuyenService } from './../../../../UNGVIEN/services/ungtuyen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';

@Component({
  selector: 'app-chitietungtuyen',
  templateUrl: './chitietungtuyen.component.html',
  styleUrls: ['./chitietungtuyen.component.css']
})
export class ChitietungtuyenComponent implements OnInit {

  constructor(
    public activatedRoute:ActivatedRoute,
    public _ungtuyenService:UngtuyenService,
    public _ungvienService:UngvienService,
    public _tintuyendungService:TintuyendungService,
    public router:Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  handleParams(){
    let id:Number = 0;
    this.activatedRoute.params.subscribe(data =>{
      id= data.id
    })
    return id
  }

  ungvien:Ungvien[] = [];
  thongtin = new Tintuyendung();
  loadData(){
    this._ungtuyenService.getUngvientheoTintuyendung(this.handleParams()).subscribe(data =>{
      console.log(data)
      this.ungvien = data;
      console.log(this.ungvien);
      for (let i = 0; i < this.ungvien.length; i++) {
        this._ungvienService.getNganhUngvien(this.ungvien[i].idUngvien).subscribe(data => {
          this.ungvien[i].tennganh = data[0].tennganh;
        });
      }
    })

    this._tintuyendungService.getChitiettintuyendung(this.handleParams()).subscribe(data =>{
      this.thongtin = data[0];
    })
  }
  Chitiet(item){
    item.daxem = true;
    this._ungtuyenService.updateUngtuyen(item.idUngvien,this.handleParams()).subscribe(data => {
      console.log(data)
      this.router.navigate(['/nhatuyendung/home/thong-tin/chi-tiet-ung-vien/',item.idUngvien]).then(() => {
        location.reload();
      });
    })
   
  }

}
