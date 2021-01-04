import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL } from 'src/environments/environment';
import { Nhatuyendung } from '../models/nhatuyendung.class';

@Injectable({
  providedIn: 'root'
})
export class NhatuyendungService {

  baseURL=ROOT_URL;
  constructor(
    public http:HttpClient
  ) { }


  //get All nhà tuyển dụng
  getAllnhatuyendung(){
    return this.http.get<Nhatuyendung[]>(this.baseURL+"api/nhatuyendungs")
  }
  //get All nhà tuyển dụng có phân trang
  getAllnhatuyendungPhanTrang(id:Number,row:Number){
    return this.http.get<Nhatuyendung[]>(this.baseURL+"api/nhatuyendungs/"+id+"&"+row)
  }
  
 //get chi tiết nhà tuyển dụng
  getChitietNTD(id:Number){
    return this.http.get<Nhatuyendung>(this.baseURL+"api/nhatuyendungs/"+id)
  }

  // update nhà tuyển dụng
  updateNTD(ntd:Nhatuyendung,id:Number){
    return this.http.put<Nhatuyendung>(this.baseURL+"api/nhatuyendungs/"+id,ntd)
  }
}
