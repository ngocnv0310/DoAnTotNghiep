import { Chuyenmon } from 'src/app/UNGVIEN/models/Base.class';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgoaiNguBase, Nganh, Loaicongviec } from '../models/Base.class';
import { ROOT_URL } from 'src/environments/environment';
import { Trinhdo } from '../models/ungvien.class';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
public baseUrl = ROOT_URL; 
  constructor(
    public http:HttpClient
  ) { }

  getAllNgoaiNgu(){
    return this.http.get<NgoaiNguBase[]>(this.baseUrl+"api/ngoaingus")
  }
  // get trình độ
  getAllTrinhdo(){
    return this.http.get<Trinhdo[]>(this.baseUrl + "api/trinhdoes")
  }
  // get nganh
  getAllNganh(){
    return this.http.get<Nganh[]>(this.baseUrl + "api/nganhs")
  }
  // get loaicong viec
  getAllLoaicongviec(){
    return this.http.get<Loaicongviec[]>(this.baseUrl + "api/loaicongviecs")
  }

  getAllphucloi(){
    return this.http.get<[]>(this.baseUrl+"api/phuclois");
  }
  

  handleError(err){
    let errorMessage='';
    if(err.error instanceof Error){
      errorMessage=(`Client-said error : ${err.error.message}`)
    }else{
      errorMessage=(`Server-said error : ${err.status} - ${err.message}`)
    }
    return errorMessage;
  }


  SendMail(mailto,codeOTP){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { toemail: mailto, subject: codeOTP };
    return this.http.post(this.baseUrl + "api/send-email", JSON.stringify(body), { headers, withCredentials: true });
  }
}
