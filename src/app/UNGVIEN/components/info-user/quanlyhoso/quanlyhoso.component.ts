import { ROOT_URL } from './../../../../../environments/environment';
import { Capbac } from './../../../models/dataDropdown';
import { Congviecmongmuon } from './../../../models/Base.class';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ungvien, Kinhnghiem, Bangcap, Ngoaingu, Trinhdo } from 'src/app/UNGVIEN/models/ungvien.class';
import { Thanhpho } from 'src/app/UNGVIEN/models/thanhpho';
import { NgoaiNguBase, Nganh, Loaicongviec } from 'src/app/UNGVIEN/models/Base.class';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';

@Component({
  selector: 'app-quanlyhoso',
  templateUrl: './quanlyhoso.component.html',
  styleUrls: ['./quanlyhoso.component.css']
})
export class QuanlyhosoComponent implements OnInit {

  // các dùng chung
  public idUser = +localStorage.getItem('idUser');
  public title: string = "Thông tin tài khoản";
  public islogin: boolean = false;
  public user = new Ungvien();
  public kinhnghiems: Kinhnghiem[] = [];
  public bangcaps: Bangcap[] = [];
  public thanhphos: Thanhpho[] = [];
  public listNganh: Nganh[] = [];
  public ngoaingus: Ngoaingu[] = [];
  public listNgoaiNgu: NgoaiNguBase[] = [];
  public listTrinhdo: Trinhdo[] = [];
  public listLoaicongviec: Loaicongviec[] = [];
  public kynangcanhan = [];
  constructor(
    public _thanhphoService: ThanhphoService,
    public _ungvienService: UngvienService,
    public _baseService: BaseService,
    private http: HttpClient
  ) { }

  public show: boolean = false;

  ngOnInit(): void {
    this.getInfo();
    this.loaddata();
    this.loadKynang();
  }

  suamuctieu = false;
  themkynang = false;
  hoten = "";
  //==========================================================
  //================THÔNG TIN CÁ NHÂN======================
  //==========================================================

  chucdanh = ""; // 162
  namkinhnghiem = ""; // 67
  congtygannhat = ""; // 163
  bangcapcaonhat = "";


  //==========================================================
  //================lOAD THÔNG TIN CHUNG======================
  //==========================================================

  //lấy thông tin user
  getInfo() {
    if (localStorage.getItem('idUser') != null) {
      this._ungvienService.getInfoUngvien(this.idUser).subscribe(data => {
        this.user = data[0];
        console.log(this.user)
        this.hoten = this.user.ho + this.user.ten;
        // hoten 

        if (this.user.kinhnghiem) {
          this.namkinhnghiem = this.user.kinhnghiem.toString() + " năm";
        }
        console.log(this.user.kinhnghiem);
        this.user.idThanhpho = data[0].idThanhpho;
        if (this.user.hinhanh == null) {
          this.user.hinhanh = this.imgPath;
        }
        console.log(this.user.hinhanh);
        if (this.user.ngaysinh != null)
          this.user.ngaysinh = (this.user.ngaysinh).substr(0, 10);
      }, erro => {
        this._baseService.handleError(erro);
      })
    }
  }



  loaddata() {
    //get data thanh pho 
    this._thanhphoService.getAllThanhpho().subscribe(data => {
      this.thanhphos = data;
    })

    //load kinh nghiệm làm việc
    this.loadKNLV();
    // load công việc mong muốn
    this.loadCongviecmongmuon();

    //lấy ngoai ngu ứng viên
    this.loadNNUV();

    //lấy bằng cấp ứng viên
    this.loadBangcap();

    // lấy list ngoại ngữ
    this._baseService.getAllNgoaiNgu().subscribe(data => {
      this.listNgoaiNgu = data;
    }, erro => {
      this._baseService.handleError(erro);
    })
    // lấy list nganh
    this._baseService.getAllNganh().subscribe(data => {
      this.listNganh = data;
    }, erro => {
      this._baseService.handleError(erro);
    })
    // lấy list loại công việc
    this._baseService.getAllLoaicongviec().subscribe(data => {
      this.listLoaicongviec = data;
    }, erro => {
      this._baseService.handleError(erro);
    })

    //get list Trinh độ
    this._baseService.getAllTrinhdo().subscribe(data => {
      this.listTrinhdo = data;
    }, erro => {
      this._baseService.handleError(erro);
    })
  }

  // load ngoại ngữ ứng viên
  loadNNUV() {
    this._ungvienService.getNgoainguungvien(this.idUser).subscribe(data => {
      this.ngoaingus = data
    }, erro => {
      this._baseService.handleError(erro);
    })
  }
  // load KNLV
  loadKNLV() {
    this._ungvienService.getKinhnghiemungvien(this.idUser).subscribe(data => {
      this.kinhnghiems = data;
      let job;
      for (let dt of data) {
        if (dt.congviechientai) {
          job = dt;
        }
      }
      if (job == null) {
        job = data[data.length - 1];
      }
      if (job != null) {
        this.chucdanh = job.chucdanh + " / " + job.chucvu;
        this.congtygannhat = job.tencongty;
      }
      console.log(job);
    }, erro => {
      this._baseService.handleError(erro);
    })
  }

  //==========================================================
  //=========THÊM XÓA SỬA CÁC THÔNG TIN NGƯỜI DÙNG============
  //==========================================================

  // thêm mới ngoại ngữ
  language = new Ngoaingu();
  AddNgoaingu() {
    this.language.idUngvien = this.idUser;
    this.language.idNgoaingu = this.language.idNgoaingu * 1
    console.log(this.language);
    this._ungvienService.AddNgoaingu(this.language).subscribe(data => {
      this.loadNNUV();
      this.isNgoaingus();
      this.language = new Ngoaingu();
    }, error => {
      this._baseService.handleError(error)
    })
  }
  //xóa ngoại ngữ
  Xoangoaingu(value) {
    console.log(value.idNgoaingu + "&&" + value.idUngvien)
    this._ungvienService.DeleteNgoaingu(value.idNgoaingu, value.idUngvien).subscribe(data => {
      alert("bạn đã xóa thành công" + value.tenngoaingu);
      this.loadNNUV();
    }, erro => {
      this._baseService.handleError(erro);
    })
  }

  // lưu thông tin cá nhân
  onSubmit() {
    this.user.ho = this.hoten.split(" ")[0].toString();
    this.user.ten = this.hoten.split(" ").slice(1).toString().replace(',', ' ');
    this.user.idThanhpho *= 1;
    this.user.nganhmongmuon *= 1;
    console.log(this.user)
    this._ungvienService.putUngvien(this.user).subscribe(data => {
      alert("update thành công");
      this.Resetform();
    }, erro => {
      this._baseService.handleError(erro);
    })
  }


  exp = new Kinhnghiem();

  AddKinhnghiem() {
    this.exp.idUngvien = this.idUser;
    this.exp.thoigianbatdau += "-01";
    if (!this.exp.congviechientai) {
      this.exp.thoigianketthuc += "-01"
    }
    console.log(this.exp)
    this._ungvienService.CreateKinhnghiem(this.exp).subscribe(data => {
      alert("thêm thành công")
      this.loadKNLV();
      this.isKinhnghiems();
      this.exp = new Kinhnghiem();
    }, erro => {
      this._baseService.handleError(erro);
    })
  }
  //xóa kinh nghiem
  Xoakinhnghiem(value) {
    this._ungvienService.DeleteKinhnghiem(value.idKinhnghiemlamviec).subscribe(data => {
      alert("bạn đã xóa thành công" + value.tenngoaingu);
      this.loadKNLV();
    }, erro => {
      this._baseService.handleError(erro);
    })

  }

  //==========================================================
  //======================= BẰNG CẤP ỨNG VIÊN ================
  //==========================================================

  //LOAD BẰNG CẤP ỨNG VIÊN
  loadBangcap() {
    this._ungvienService.getBangcapungvien(this.idUser).subscribe(data => {
      this.bangcaps = data;
      if (data.length > 0) {
        data.sort((a, b) => (a.giatri > b.giatri ? -1 : 1));
        this.bangcapcaonhat = data[0].tentrinhdo;
      }
      console.log(this.bangcaps)
    }, erro => {
      this._baseService.handleError(erro);
    })
  }

  //Thêm bằng cấp
  hocvan = new Bangcap();
  Thembangcap() {
    this.hocvan.idUngvien = this.idUser;
    this.hocvan.ngaybatdau += "-01"
    this.hocvan.ngayketthuc += "-01"
    this.hocvan.idTrinhdo *= 1;
    console.log(this.hocvan)
    this._ungvienService.CreateBangcap(this.hocvan).subscribe(data => {
      alert("thêm thành công")
      this.loadBangcap();
      this.isHocvans();
      this.hocvan = new Bangcap();
    }, erro => {
      this._baseService.handleError(erro);
    })
  }

  // xóa bằng cấp
  DeleteBangcap(value) {
    console.log(value)
    this._ungvienService.DeleteBangcapungvien(value.idBangcap).subscribe(data => {
      alert("bạn đã xóa thành công" + value.tenngoaingu);
      this.loadBangcap();
    }, erro => {
      this._baseService.handleError(erro);
    })
  }




  //==========================================================
  //==========================================================
  //==========================================================
  congviechientai(value) {
    if (value) {
      this.exp.thoigianketthuc = null;
    }
    else
      this.exp.congviechientai = false;

  }

  endjob(value) {
    if (value) {
      this.exp.congviechientai = false;
    }
  }

  cancle() {

  }

  //==========================================================
  //=========ẨN HIỆN CÁC BODY CHO NGƯỜI DÙNG THAO TÁC=========
  //==========================================================
  isInfo = false;
  isHocvan = false;
  isNgoaingu = false;
  isKinhnghiem = false;

  isShow() {
    this.show = !this.show;
  }
  isInfos() {
    this.isInfo = !this.isInfo;
  }
  isNgoaingus() {
    this.isNgoaingu = !this.isNgoaingu;
  }
  isHocvans() {
    this.isHocvan = !this.isHocvan;
  }
  isKinhnghiems() {
    this.isKinhnghiem = !this.isKinhnghiem;
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
    if (f.value.matkhau != this.user.matkhau) {
      alert('mật khẩu chưa chính xác')
      return
    }
    else {
      this.user.matkhau = f.value.matkhaumoi;
      console.log(this.user);
      this._ungvienService.putUngvien(this.user).subscribe(data => {
        alert('Mật khẩu đã được thay đổi')
      }, erro => {
        this._baseService.handleError(erro);
      })
    }
  }

  //==========================================================
  //=============== Sửa  =====================
  //==========================================================

  suahv(item) {
    this.isHocvan = true;
    this.hocvan = item;
    this.hocvan.ngaybatdau = this.hocvan.ngaybatdau.substring(0, 7)
    this.hocvan.ngayketthuc = this.hocvan.ngayketthuc.substring(0, 7)
    console.log(item);
  }




  //==========================================================
  //=============== UPLOAD FILE HÌNH ẢNH =====================
  //==========================================================
  public progress: number;
  public message: string;
  public response: any = [];
  imgPath = 'Resources/Images/user.jpg';


  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  public pipeTP = (id: number) => {
    for (let x of this.thanhphos) {
      if (x.idThanhpho.toString() == id.toString())
        return x.tenthanhpho;
    }
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }


    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44309/api/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.response = event.body;
          this.user.hinhanh = this.response.dbPath;
          this._ungvienService.putUngvien(this.user).subscribe(data => {
          }, erro => {
            this._baseService.handleError(erro);
          })
        }
      });
  }


  public uploadHoso = (files) => {
    if (files.length === 0) {
      return;
    }


    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44309/api/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.response = event.body;
          this.user.urlCv = this.response.dbPath;
          this._ungvienService.putUngvien(this.user).subscribe(data => {
          }, erro => {
            this._baseService.handleError(erro);
          })
        }
      });
  }

  update() {
    this._ungvienService.putUngvien(this.user).subscribe(data => {
    }, erro => {
      this._baseService.handleError(erro);
    })
  }

  loadKynang(){
    this._ungvienService.Getkynangungvien(+localStorage.getItem('idUser')).subscribe(data => {
      this.kynangcanhan = data;
    })
  }


  ThemKynangcanhan(f) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = { tenkynang: f.tenkynang, motakynang: f.motakynang, idUngvien: +localStorage.getItem('idUser') };
    this.http.post(ROOT_URL + "api/kynangungviens", JSON.stringify(body), { headers, withCredentials: true }).subscribe(data=>{
      console.log(data)
      this.loadKynang();
      this.themkynang=false;
    });
  }

  XoaKynang(item){
    if(confirm('Bạn muốn xóa kỹ năng'+item.tenkynang)){
      this.http.delete(ROOT_URL + "api/kynangungviens/"+ item.idKynangcanhan).subscribe(data=>{
        this.loadKynang();
      });
    }
  }


  public capbac = Capbac;
  //======================================================
  //công việc mong muốn
  congviecmongmuon = new Congviecmongmuon();
  submitCongviec() {

  }

  listCVungvien = [];
  loadCongviecmongmuon() {
    this._ungvienService.getCongviecmongmuontheoUV(localStorage.getItem('idUser')).subscribe(data => {
      this.listCVungvien = data;
      for (let item of this.listCVungvien) {
        this._ungvienService.GetnoilamviectheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(dt => {
          item.thanhpho = dt;
        })
        this._ungvienService.GetnganhnghetheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(dt => {
          item.nganhnghe = dt;
        })
      }
    })
  }

  XoaCongviecmongmuon(item) {
    // Xóa nơi làm việc
    this._ungvienService.GetnoilamviectheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(
      data => {
        if (data.length > 0) {
          this._ungvienService.DeletenoilamviectheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(data => {
            console.log('đã xóa');
          })
        }
        // xóa ngành
        this._ungvienService.GetnganhnghetheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(
          data => {
            if (data.length > 0) {
              this._ungvienService.DeleteNganhnghemongmuon(item.idCongviecmongmuon).subscribe(data => {
                console.log('đã xóa');
                this._ungvienService.DeleteCongviecmongmuon(item.idCongviecmongmuon).subscribe(data => {
                  this.loadCongviecmongmuon();
                });
              })
            }
            else {
              this._ungvienService.DeleteCongviecmongmuon(item.idCongviecmongmuon).subscribe(data => {
                this.loadCongviecmongmuon();
              });
            }


          }
        );
      }
    );
  }
  Resetform() {
    this.editCV = false;
    this.congviecmongmuon = new Congviecmongmuon();
    this.dsNganh = [];
    this.listTP = [];
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }



  addTP(item) {
    for (let i of this.listTP) {
      if (item.idThanhpho == i.idThanhpho) {
        return;
      }
    }
    this.listTP.push(item);
    console.log(this.listTP)
  }

  remove(item) {
    this.listTP.splice(item, 1);
    console.log(this.listTP);
  }
  addNganh(item) {
    for (let i of this.dsNganh) {
      if (item.idNganh == i.idNganh) {
        return;
      }
    }
    this.dsNganh.push(item);
    console.log(this.dsNganh)
  }

  removeNganh(item) {
    this.dsNganh.splice(item, 1);
    console.log(this.dsNganh);
  }
  dsNganh = [];
  listTP = [];

  SuaCongviec(item) {
    this._ungvienService.getChitietCongviecmongmuon(item.idCongviecmongmuon).subscribe(data => {
      this.congviecmongmuon = data;
      this._ungvienService.GetnoilamviectheoCongviecmongmuon(this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
        this.listTP = data;
      });
      this._ungvienService.GetnganhnghetheoCongviecmongmuon(this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
        this.dsNganh = data;
      });
    })
  }

  // xóa CV
  XoaCV() {
    if (confirm('Bạn có muốn xóa CV hiện tại')) {
      this.user.urlCv = null;
      this.update()
    }
  }

  editCV = false;

  editthongtin = false;

  public tenthanhpho = (value) => {
    for (let x of this.thanhphos) {
      if (x.idThanhpho == value)
        return x.tenthanhpho
    }
  }

  public nganhlamviec = (value) => {
    for (let x of this.listNganh) {
      if (x.idNganh == value) {
        return x.tennganh
      }
    }
  }

}
