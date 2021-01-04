import { Nganh } from 'src/app/UNGVIEN/models/Base.class';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { Component, OnInit } from '@angular/core';
import { Nhatuyendung } from 'src/app/UNGVIEN/models/nhatuyendung.class';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thongtincongty',
  templateUrl: './thongtincongty.component.html',
  styleUrls: ['./thongtincongty.component.css']
})
export class ThongtincongtyComponent implements OnInit {

  // các dùng chung
  public idUser = +localStorage.getItem('idUser');
  public title: string = "Thông tin tài khoản";
  public islogin: boolean = false;
  public listNganh: Nganh[] = [];
  constructor(
    public _ntdService:NhatuyendungService,
    public _baseService:BaseService,
    public http:HttpClient
  ) { }
    nganh="";
  public show: boolean = false;
  showi4  = false;



  ngOnInit(): void {
    this.getInfo();
    this.loaddata();
 
  }

  Suand(){
    this.showi4 = true;
  }

  //==========================================================
  //================lOAD THÔNG TIN CHUNG======================
  //==========================================================

  //lấy thông tin NTD
  nhatuyendung = new Nhatuyendung()
  getInfo() {
    this._baseService.getAllNganh().subscribe(data => {
      this.listNganh = data;
    })
    this._ntdService.getChitietNTD(+localStorage.getItem('idNTD')).subscribe(data => {
      this.nhatuyendung = data[0];
      if(this.nhatuyendung.nganhnghehoatdong){
        for(let ng of this.listNganh){
          if(this.nhatuyendung.nganhnghehoatdong==ng.idNganh){
            console.log(ng)
            this.nganh = ng.tennganh;
            return
          }
        }
      }
    });
   

  }



  loaddata() {
    
  }


  //==========================================================
  //=========ẨN HIỆN CÁC BODY CHO NGƯỜI DÙNG THAO TÁC=========
  //==========================================================
  isInfo = false;

  isShow() {
    this.show = !this.show;
  }

  HuyData(){
    this.getInfo();
    this.showi4=false;
  }

  //==========================================================
  //=================== THAO TÁC VỚI THÔNG TIN ===============
  //==========================================================

  Doimatkhau(f) {
    // let continute = false
    console.log(f.value.matkhau)
    console.log(f.value.matkhaumoi)
    console.log(f.value.xacnhanmatkhau)
    if (f.value.matkhaumoi != f.value.xacnhanmatkhau) {
      alert('Xác nhận mật khẩu chưa trùng khớp')
      return
    }
    if (f.value.matkhau != this.nhatuyendung.matkhau) {
      alert('mật khẩu chưa chính xác')
      return
    }
    else {
      this.nhatuyendung.matkhau = f.value.matkhaumoi;
      this.UpdateNTD();
    }
  }

  UpdateNTD(){
    this.nhatuyendung.nganhnghehoatdong *=1;
    this.nhatuyendung.quymocongty *=1;
    console.log(this.nhatuyendung);
    console.log(JSON.stringify(this.nhatuyendung));
    this._ntdService.updateNTD(this.nhatuyendung, this.nhatuyendung.idNhatuyendung).subscribe(data => {
      alert('Đã cập nhật thành công')
    }, erro => {
      console.log(this._baseService.handleError(erro))
    })
  }

  //==========================================================
  //=============== UPLOAD FILE HÌNH ẢNH =====================
  //==========================================================
  public progress: number;
  public message: string;
  public response: any = [];
  imgPath = 'Resources/Images/user.jpg';


  public createImgPath = (serverPath: string) => {
    if(serverPath==null || serverPath === undefined){
      serverPath = 'Resources/Images/user.jpg';
    }
    return `https://localhost:44309/${serverPath}`;
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44309/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.response = event.body;
          this.nhatuyendung.logo = this.response.dbPath;
          console.log(this.nhatuyendung.logo)
        }
      });
  }
  //up banner
  public uploadBanner = (files) => {
    if (files.length === 0) {
      return;
    }
    

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44309/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.response = event.body;
          this.nhatuyendung.bannercongty = this.response.dbPath;
          console.log(this.nhatuyendung.bannercongty+"Banner")
        }
      });
  }
  //up banner
  public uploadhinhanh = (files) => {
    if (files.length === 0) {
      return;
    }
    

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44309/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.response = event.body;
          this.nhatuyendung.hinhanh = this.response.dbPath;
          console.log(this.nhatuyendung.hinhanh+"hình ảnh")
        }
      });
  }
}

