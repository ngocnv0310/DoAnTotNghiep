import { Congviecmongmuon } from './../models/Base.class';
import { Injectable } from '@angular/core';
import { IsLogin, Ungvien, Ngoaingu, Kinhnghiem, Bangcap, Trinhdo } from 'src/app/UNGVIEN/models/ungvien.class'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ROOT_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UngvienService {
  public baseURL: string = ROOT_URL;
  constructor(
    public http: HttpClient
  ) { }

  //get All ung vien
  getAllUngvien() {
    return this.http.get<Ungvien[]>(this.baseURL + "api/ungviens");
  }
  //get All ung vien
  getUngvienSearch(stringquery) {
    return this.http.get<Ungvien[]>(this.baseURL + "api/ungviens/searchUngvien?"+stringquery);
  }
  getInfoUngvien(id: number) {
    return this.http.get<Ungvien>(this.baseURL + "api/ungviens/" + id);
  }

  AddNgoaingu(ngoaingu: Ngoaingu) {
    return this.http.post<Ngoaingu>(this.baseURL + "api/ngoainguungviens", ngoaingu)
  }

  //getNgoainguungvien
  getNgoainguungvien(id: number) {
    return this.http.get<Ngoaingu[]>(this.baseURL + "api/ngoainguungviens/ungvien/" + id)
  }
  // get kinh nghiệm
  getKinhnghiemungvien(id: number) {
    return this.http.get<Kinhnghiem[]>(this.baseURL + "api/kinhnghiemlamviecs/ungvien/" + id)
  }

  // get ngành ứng viên
  getNganhUngvien(id: number) {
    return this.http.get(this.baseURL + "api/nganhs/ungvien/" + id);
  }





  // update ứng viên
  putUngvien(ungvien: Ungvien) {
    return this.http.put<Ungvien>(this.baseURL + "api/ungviens/" + ungvien.idUngvien, ungvien)
  }

  // thêm kinh nghiem làm việc
  CreateKinhnghiem(exp: Kinhnghiem) {
    return this.http.post<Kinhnghiem>(this.baseURL + "api/kinhnghiemlamviecs", exp)
  }

  //xóa ngoại ngữ
  DeleteNgoaingu(idNgoaingu: number, idUngvien: number) {
    return this.http.delete(this.baseURL + "api/ngoainguungviens/" + idNgoaingu + "&&" + idUngvien)
  }
  //xóa kinh nghiem
  DeleteKinhnghiem(id: number) {
    return this.http.delete(this.baseURL + "api/kinhnghiemlamviecs/" + id)
  }


  //=======================================================================
  //============================ CRUD BẰNG CẤP ============================
  //=======================================================================
  //get bằng cấp
  getBangcapungvien(id: number) {
    return this.http.get<Bangcap[]>(this.baseURL + "api/bangcaps/ungvien/" + id)
  }
  //DELETE bằng cấp
  DeleteBangcapungvien(id: number) {
    return this.http.delete(this.baseURL + "api/bangcaps/" + id)
  }
  // CREATE BẰNG CẤP
  CreateBangcap(bangcap: Bangcap) {
    return this.http.post<Bangcap>(this.baseURL + "api/bangcaps", bangcap)
  }

  // ==========================================================
  // khu vực công việc mong muốn
  // ==========================================================
  //== get công việc mong muốn theo ứng viên
  getCongviecmongmuontheoUV(id) {
    return this.http.get<Congviecmongmuon[]>(this.baseURL + "api/congviecmongmuons/ungvien/" + id);
  }
  //== get chi tiết công việc mong muốn
  getChitietCongviecmongmuon(id) {
    return this.http.get<Congviecmongmuon>(this.baseURL + "api/congviecmongmuons/" + id);
  }
  //== Tạo mới công việc
  CreateCongviecmongmuon(congviec: Congviecmongmuon) {
    return this.http.post<Congviecmongmuon>(this.baseURL + "api/congviecmongmuons", congviec);
  }
  //== up date công việc mong muốn
  UpdateCongviecmongmuon(congviec: Congviecmongmuon) {
    return this.http.put<Congviecmongmuon>(this.baseURL + "api/congviecmongmuons/" + congviec.idCongviecmongmuon, congviec);
  }
  //== Xóa công việc mong muốn
  DeleteCongviecmongmuon(id) {
    return this.http.delete<Congviecmongmuon>(this.baseURL + "api/congviecmongmuons/" + id);
  }
  // ==========================================================
  // khu vực mong muốn theo khu vực mong muốn
  // ==========================================================
  //== tạo khu vực mong muốn theo công viêc mong muốn
  CreateKhuVucmongmuon(idkhuvuc,idcongviec){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { idThanhpho: idkhuvuc, idCongviecmongmuon: idcongviec };
    return this.http.post(this.baseURL + "api/noilamviecmongmuons", JSON.stringify(body), { headers, withCredentials: true });
  }
  //=====================================
  //= get nơi làm việc mong muốn theo công việc mong muốn
  GetnoilamviectheoCongviecmongmuon(id){
    return this.http.get<[]>(this.baseURL+"api/noilamviecmongmuons/"+id);
  }
  //=====================================
  //= xóa nơi làm việc mong muốn theo công việc mong muốn
  DeletenoilamviectheoCongviecmongmuon(id){
    return this.http.delete(this.baseURL+"api/noilamviecmongmuons/"+id);
  }


  //=====================================
  //= get ngành nghề mong muốn theo công việc mong muốn
  GetnganhnghetheoCongviecmongmuon(id){
    return this.http.get<[]>(this.baseURL+"api/nganhnghemongmuons/"+id);
  }

  CreateNganhnghemongmuon(idNganh,idcongviec){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { idNganh: idNganh, idCongviecmongmuon: idcongviec };
    return this.http.post(this.baseURL + "api/nganhnghemongmuons", JSON.stringify(body), { headers, withCredentials: true });
  }
  //=====================================
  //= xóa Ngành nghề mong muốn theo công việc mong muốn
  DeleteNganhnghemongmuon(id){
    return this.http.delete(this.baseURL+"api/nganhnghemongmuons/"+id);
  }

  // get ky nang ung vien
  Getkynangungvien(idUngvien){
    // https://localhost:44309/api/kynangungviens/ungvien/1
    return this.http.get<[]>(this.baseURL + "api/kynangungviens/ungvien/"+idUngvien)
  }

}
