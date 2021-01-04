import { Boloc } from './../../../../models/Base.class';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';
import { Capbac, Luong } from './../../../../models/dataDropdown';
import { Nganh } from 'src/app/UNGVIEN/models/Base.class';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { Tintuyendung } from 'src/app/UNGVIEN/models/tintuyendung.class';
@Component({
  selector: 'app-congvieckhac',
  templateUrl: './congvieckhac.component.html',
  styleUrls: ['./congvieckhac.component.css']
})
export class CongvieckhacComponent implements OnInit {


  tintuyendung: Tintuyendung[] = [];
  listTintuyendungs = [];
  listThanhpho: Thanhpho[] = [];
  listNganh: Nganh[] = [];
  capbac = Capbac;


  public nameproduct: string;
  public priceproduct: number;
  public statusproduct: boolean;
  public phucloi = [];
  idNTD = 0;




  constructor(
    public _tpService: ThanhphoService,
    public _tintuyendungService: TintuyendungService,
    public _nhatuyendungService: NhatuyendungService,
    public _baseService: BaseService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata() {
    let id: Number = +localStorage.getItem('job');
    this._tintuyendungService.getChitiettintuyendung(id).subscribe(data => {
      this.idNTD = +data[0].idNhatuyendung;
      this.getBaidang();
    }, erro => {
      console.log(this._baseService.handleError(id));
    });


  }

  getBaidang() {
    this._tintuyendungService.getTintuyendungFromCongty(this.idNTD).subscribe(data => {
      this.listTintuyendungs = data.filter(z=>{
        return z.trangthai.toLocaleLowerCase().indexOf(("Đã duyệt").toLocaleLowerCase()) != -1;
      });
      var  x;
      for(let i = 0;i<this.listTintuyendungs.length;i++){
        if(this.listTintuyendungs[i].idTintuyendung==localStorage.getItem('job')){
          x= i;
          break;
        }
      }
      this.listTintuyendungs.splice(x,1);
    });
    
  }

  Xemtin(item) {
    this.router.navigate(['/ungvien/vieclam/', item.idTintuyendung]).then(() => {
      window.location.reload();
    });;
    // localStorage.setItem('job',item.idTintuyendung.toString());
    // [routerLink]="['/ungvien/vieclam/', item.idTintuyendung]"
  }


  listLuong = Luong;

  
  public getIcon = (serverPath: string) => {
    return `../../../../../assets/image/iconphucloi/${serverPath}.png`;
  }



  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

}
