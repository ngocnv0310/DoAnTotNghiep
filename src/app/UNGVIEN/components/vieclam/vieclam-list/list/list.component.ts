import { Component, OnInit } from '@angular/core';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { Router } from '@angular/router';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listTintuyendungs :Tintuyendung[] = [];

  public nameproduct: string;
  public priceproduct: number;
  public statusproduct: boolean;



  constructor(
    public _tintuyendungService:TintuyendungService,
    public _routerService:Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this._tintuyendungService.getAllTintuyendung(0).subscribe(data=>{
      this.listTintuyendungs = data
      console.log(data)
    })
  }

  

  workDetail(value){
    console.log(value)
    this._routerService.navigate(['/ungvien/vieclam/'+value.idTintuyendung])
  }


  onGetboloc(value){
    console.log(value)
  }

}
