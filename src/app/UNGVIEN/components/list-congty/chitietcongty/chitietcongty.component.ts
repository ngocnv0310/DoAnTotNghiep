import { ROOT_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Nhatuyendung } from 'src/app/UNGVIEN/models/nhatuyendung.class';

@Component({
  selector: 'app-chitietcongty',
  templateUrl: './chitietcongty.component.html',
  styleUrls: ['./chitietcongty.component.css']
})
export class ChitietcongtyComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public _ntdServices: NhatuyendungService,
    public _ttdServices: TintuyendungService,
    public http:HttpClient
  ) { }
  idNTD = 0;
  ntd = new Nhatuyendung();
  listTin:Tintuyendung[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.idNTD = data.id
    })
    this.loadData();
  }

  diadiemlamviec =[];
  loadData() {
    this._ntdServices.getChitietNTD(this.idNTD).subscribe(data => {
      this.ntd = data[0];
      console.log(this.ntd);
      this.ntd.videogioithieu = "https://www.youtube.com/embed/" + this.ntd.videogioithieu.slice(32);
    })
    this._ttdServices.getTintuyendungFromCongty(this.idNTD).subscribe(data => {
      this.listTin = data.filter(x=>{
        return x.trangthai.toLocaleLowerCase().indexOf(("Đã duyệt").toLocaleLowerCase()) != -1;
      });
    })
    this._ttdServices.getDiadiemlamviectheocongty(this.idNTD).subscribe(data =>{
     
      this.diadiemlamviec = data;
      for(let a of this.diadiemlamviec){
        this.http.get(ROOT_URL+"api/quans/"+a.idQuan).subscribe(thanhpho => {
          console.log(thanhpho[0]);
          a.tenquan = thanhpho[0].tenquan;
          a.tenthanhpho = thanhpho[0].idThanhphoNavigation.tenthanhpho;
          a.idthanhpho = thanhpho[0].idThanhphoNavigation.idThanhpho;
          console.log(a);
          this.sortTP();
        })
      }

    })

  }

  sortTP(){
    this.diadiemlamviec.sort((a, b) => (a.idthanhpho > b.idthanhpho ? -1 : 1));
      console.log(this.diadiemlamviec)
  }

  public get sortedArray(): any[] {
    return this.diadiemlamviec.sort((a, b) => (a.idthanhpho > b.idthanhpho ? -1 : 1));
}

  // load image 
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


}
