import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { Chuyenmon } from 'src/app/UNGVIEN/models/Base.class';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
@Component({
  selector: 'app-thongtin',
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.css']
})
export class ThongtinComponent implements OnInit {

  tintuyendung = new Tintuyendung();
  chuyenmon :Chuyenmon[] = [];
  constructor(
    public _tintuyendungService:TintuyendungService,
    public _baseService:BaseService
  ) { }

  nganh="";
  ngOnInit(): void {
    this.loaddata();
  }
  loaddata(){
    let id:Number = +localStorage.getItem('job');
    this._tintuyendungService.getChitiettintuyendung(id).subscribe(data =>{
      this.tintuyendung = data[0];
      console.log(data[0].nganhtuyendung)
      for(let item of data[0].nganhtuyendung){
        this.LoadNganh(item.idNganh);
      }
      // this.tintuyendung.tennganh = data[0].idNganhNavigation.tennganh;
    },erro =>{
      console.log(this._baseService.handleError(id));
    });

    //load ngành
  }
  
  LoadNganh(manganh){
    this._baseService.getAllNganh().subscribe(data => {
      for(let item of data){
        if(manganh == item.idNganh){
          this.nganh += item.tennganh.toString() + ", "
        }
        this.nganh.substring(this.nganh.length-3);
        console.log(this.nganh);
      }
    })
  }

 

}
