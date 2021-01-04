import { Component, OnInit,Input } from '@angular/core';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { Chuyenmon } from 'src/app/UNGVIEN/models/Base.class';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { Nhatuyendung } from 'src/app/UNGVIEN/models/nhatuyendung.class';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';

@Component({
  selector: 'app-congty',
  templateUrl: './congty.component.html',
  styleUrls: ['./congty.component.css']
})
export class CongtyComponent implements OnInit {

  public video="https://www.youtube.com/embed/";
  nhatuyendung = new Nhatuyendung();
  constructor(
    public _tintuyendungService:TintuyendungService,
    public _nhatuyendungService:NhatuyendungService,
    public _baseService:BaseService
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata(){
    let idNTD:Number;
    let id:Number = +localStorage.getItem('job');
    this._tintuyendungService.getChitiettintuyendung(id).subscribe(data =>{
      idNTD = +data[0].idNhatuyendung; 
      this._nhatuyendungService.getChitietNTD(idNTD).subscribe(data =>{
        this.nhatuyendung = data[0];
        this.video += this.nhatuyendung.videogioithieu.slice(32);
        console.log(this.video)
      });
    },erro =>{
      console.log(this._baseService.handleError(id));
    });
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

}
