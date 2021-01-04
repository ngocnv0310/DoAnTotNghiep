import { today } from './../models/Base.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ROOT_URL } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UngtuyenService {

  baseURL = ROOT_URL;
  constructor(
    public http:HttpClient,
  ) { }

  // get ứng viên đã ứng tuyển theo bài đăng(tin tuyển dụng)
  getUngvientheoTintuyendung(id: Number){
    return this.http.get<[]>(this.baseURL+"api/dangtintuyendungs/ungtuyen/" + id)
  }
  //get lưu việc làm theo danh sách ứng viên
  getVieclamLuutheoUngvien(id: Number){
    return this.http.get<[]>(this.baseURL+ "api/ungviens/luucongviec/" +id)
  }
  //get danh sách ứng tuyển theo ứng viên
  getUngtuyen(id: Number,idtin :Number){
    return this.http.get<[]>(this.baseURL+ "api/ungtuyens/" +id+"&"+idtin)
  }

   //check xem ứng viên có lưu công việc hay chưa hay chưa
   getLuuCV(id: Number,idtin :Number){
    return this.http.get<[]>(this.baseURL+ "api/luucongviecs/" +idtin+"&"+id)
  }
   //xóa công việc đã lưu
   XoaLuucongviec(id: Number,idtin :Number){
    return this.http.delete(this.baseURL+ "api/luucongviecs/" +idtin+"&"+id)
  }


  //get việc làm ứng viên đã ứng tuyển
  getVieclamungtuyen(id: Number){
    return this.http.get<[]>(this.baseURL+ "api/ungviens/ungtuyen/" +id)
  }

  // nhà tuyển dụng lưu ứng viên
  NTDsaveUngvien(idNTD,idUV){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { idNhatuyendung: +idNTD, idUngvien: idUV,ngayluu:today };
    console.log(JSON.stringify(body));
    return this.http.post(this.baseURL+"api/luuungviens",JSON.stringify(body), { headers, withCredentials: true });
  }
  // nhà tuyển dụng Xóa ứng viên
  NTDdeleteUngvien(idNTD,idUV){
    return this.http.delete(this.baseURL+"api/luuungviens/"+idNTD+"&"+idUV );
  }

  updateUngtuyen(idungvien,idcongviec){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { idUngvien: +idungvien, idCongviec: +idcongviec,daxem: true};
    return this.http.put(this.baseURL+"api/ungtuyens",JSON.stringify(body), { headers, withCredentials: true });
  }




}
