import { Congviecmongmuon } from './../models/Base.class';
import { Diadiemlamviec } from './../models/tintuyendung.class';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tintuyendung } from '../models/tintuyendung.class';
import { ROOT_URL } from 'src/environments/environment';
import { Chuyenmon } from '../models/Base.class';

@Injectable({
  providedIn: 'root'
})
export class TintuyendungService {

  baseURL=ROOT_URL;
  constructor(
    public http:HttpClient
  ) { }

  //get all tin tuyển dụng
  getAllTintuyendung(querystring){
    if(querystring==null)
    querystring = 0;
    return this.http.get<Tintuyendung[]>(this.baseURL+"api/dangtintuyendungs?idUngvien="+querystring)
  }
   //get chi tiết tin tuyển dụng
  getChitiettintuyendung(id:Number){
    return this.http.get<Tintuyendung>(this.baseURL+"api/dangtintuyendungs/"+id)
  }

  //get nhà tin tuyển dụng từ công ty
  getTintuyendungFromCongty(id:Number){
    return this.http.get<Tintuyendung[]>(this.baseURL+"api/dangtintuyendungs/congty/"+id)
  }

  //post tin tuyển dụng
  themtintuyendung(tin:Tintuyendung){
    console.log(tin);
    console.log(JSON.stringify(tin) );
    
    return this.http.post<Tintuyendung>(this.baseURL+"api/dangtintuyendungs",tin)
  }

  //Update tin tuyen dung
  UpdateTin(tin:Tintuyendung){
    return this.http.put<Tintuyendung>(this.baseURL+"api/dangtintuyendungs/"+tin.idTintuyendung,tin)
  }

  //get dia diem lam việc theo công ty
  getDiadiemlamviectheocongty(id:Number){
    return this.http.get<Diadiemlamviec[]>(this.baseURL+"api/diadiemlamviecs/"+id); 
  }
  //Thêm địa điểm làm việc
  ThemDiadiemlamviec(place:Diadiemlamviec){
    return this.http.post<Diadiemlamviec>(this.baseURL+"api/diadiemlamviecs",place);
  }  


  // ngành nghề tin tuyển dụng
  //--------------Thêm mới ngành nghề mong muốn
  CreateNganhtuyendung(nganh,tintuyendung){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { idNganh: nganh, idTintuyendung: tintuyendung };
    return this.http.post(this.baseURL+"api/nganhtuyendungs", JSON.stringify(body), { headers, withCredentials: true });
  }
  //-----------------xóa ngành đã chọn theo mã tin tuyển dụng
  DeleteNganhtuyendung(idTintuyendung){
    return this.http.delete(this.baseURL+"api/nganhtuyendungs/"+idTintuyendung);
  }
  //-----------------Get ngành tuyển dụng theo mã tin tuyển dụng
  GetNganhtuyendung(idTintuyendung){
    return this.http.get<[]>(this.baseURL+"api/nganhtuyendungs/"+idTintuyendung);
  }

  //===================================================
  //====================== SEARCH =====================
  //===================================================

  OnseachCongviec(queryString){
    return this.http.get<any[]>(this.baseURL+"api/dangtintuyendungs/search?"+queryString)
  }
  
  
}
