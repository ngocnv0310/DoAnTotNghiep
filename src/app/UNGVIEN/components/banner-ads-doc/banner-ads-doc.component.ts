import { NhatuyendungService } from './../../services/nhatuyendung.service';
import { Component, OnInit } from '@angular/core';
import { Nhatuyendung } from '../../models/nhatuyendung.class';

@Component({
  selector: 'app-banner-ads-doc',
  templateUrl: './banner-ads-doc.component.html',
  styleUrls: ['./banner-ads-doc.component.css']
})
export class BannerAdsDocComponent implements OnInit {

  constructor(
    public _ntd:NhatuyendungService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  topNTD = new Nhatuyendung();
  loadData(){
    this._ntd.getAllnhatuyendung().subscribe(data => {
      // console.log(data.sort((a, b) => (a.douutien < b.douutien ? -1 : 1))); // càng nhỏ ưu tiên càng cao
      let result = data.sort((a, b) => (a.luotxem < b.luotxem ? 1 : -1)); 
      // console.log(result);
      this.topNTD = data[0];
      // console.log(this.topNTD);

      
      // sort.sort((a, b) => (a.tencongty < b.tencongty ? -1 : 1));
    })
  }

  // load image 
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

}
