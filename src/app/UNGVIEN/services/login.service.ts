import { Injectable } from '@angular/core';
import { ROOT_URL } from 'src/environments/environment';
import { Ungvien } from '../models/ungvien.class';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ResponeResult } from '../models/ResponeResult.class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public baseURL: string = ROOT_URL;
  constructor(
    public http: HttpClient
  ) { }

  checkLogin(email: string, matkhau: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { email: email, matkhau: matkhau };
    return this.http.post<ResponeResult>(this.baseURL + "api/ungvienlogin", JSON.stringify(body), { headers, withCredentials: true });
  }

  // đăng ký tài khoản
  dangKytaikhoan(ungvien: Ungvien) {
    return this.http.post<ResponeResult>(this.baseURL + "api/ungviens", ungvien);
  }
  // đăng ký tài khoản
  dangKytaikhoanNTD(ntd) {
    return this.http.post<ResponeResult>(this.baseURL + "api/nhatuyendungs", ntd);
  }

  //log in nhà tuyển dụng
  NTDLogin(email: string, matkhau: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { email: email, matkhau: matkhau };
    return this.http.post<ResponeResult>(this.baseURL + "api/nhatuyendunglogin", JSON.stringify(body), { headers, withCredentials: true });
  }


}
