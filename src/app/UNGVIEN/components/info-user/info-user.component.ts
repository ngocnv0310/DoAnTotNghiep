import { Component, OnInit } from '@angular/core';
import { Ungvien, Ngoaingu, Kinhnghiem, Bangcap, Trinhdo } from '../../models/ungvien.class';
import { ThanhphoService } from '../../services/thanhpho.service';
import { Thanhpho } from '../../models/thanhpho';
import { UngvienService } from '../../services/ungvien.service';
import { NgoaiNguBase } from '../../models/Base.class';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  


  step='step1';
  //contructor
  constructor(
    
  ) {
  }
  public show: boolean = false;

  ngOnInit(): void {
    

  }


  

}
