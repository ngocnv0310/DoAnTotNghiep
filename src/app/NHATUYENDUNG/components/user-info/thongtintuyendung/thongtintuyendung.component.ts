import { Router } from '@angular/router';
import { NhatuyendungService } from './../../../../UNGVIEN/services/nhatuyendung.service';
import { Loaicongviec, today } from './../../../../UNGVIEN/models/Base.class';
import { Thanhpho } from './../../../../UNGVIEN/models/thanhpho';
import { Nganh, Chuyenmon } from 'src/app/UNGVIEN/models/Base.class';
import { ThanhphoService } from 'src/app/UNGVIEN/services/thanhpho.service';
import { Capbac } from './../../../../UNGVIEN/models/dataDropdown';
import { Tintuyendung, Diadiemlamviec } from 'src/app/UNGVIEN/models/tintuyendung.class';
import { Component, OnInit } from '@angular/core';
import { TintuyendungService } from 'src/app/UNGVIEN/services/tintuyendung.service';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';

@Component({
  selector: 'app-thongtintuyendung',
  templateUrl: './thongtintuyendung.component.html',
  styleUrls: ['./thongtintuyendung.component.css']
})
export class ThongtintuyendungComponent implements OnInit {

  constructor(
    public _tintuyendungServices: TintuyendungService,
    public _baseServices: BaseService,
    public _thanhphoService: ThanhphoService,
    public _nhatuyendungService: NhatuyendungService,
    public router: Router

  ) { }

  ngOnInit(): void {
    this.loadData();
    this.loadList();
    this.loadModal();
  }

  showdetail = false;
  tindaduyet = true;

  tintuyendung: Tintuyendung[] = [];
  tincchuaduyet: Tintuyendung[] = [];
  listLoaicongviec: Loaicongviec[] = [];
  loadData() {
    this._tintuyendungServices.getTintuyendungFromCongty(+localStorage.getItem('idNTD')).subscribe(data => {
      console.log(data)
      this.tintuyendung = data.sort((a, b) => (a.ngaydang > b.ngaydang) ? -1 : 1);
      var tintc = data.filter(x => {
        return x.trangthai.toLocaleLowerCase().indexOf(("Đã xóa").toLocaleLowerCase()) != -1;
      })
      this.tintuyendung = data.filter(x => {
        return x.trangthai.toLocaleLowerCase().indexOf(("Đã duyệt").toLocaleLowerCase()) != -1;
      }).concat(tintc);
      console.log(this.tintuyendung);
      this.tincchuaduyet = data.filter(x => {
        return x.trangthai.toLocaleLowerCase().indexOf(("Chưa duyệt").toLocaleLowerCase()) != -1;
      })
    })
    this._baseServices.getAllLoaicongviec().subscribe(data => {
      this.listLoaicongviec = data;
    })

    this._baseServices.getAllphucloi().subscribe(data => {
      this.phucloi = data.slice(0, data.length - 1);
    });
  }

  today = today;

  XoaData(item) {
    item.isdelete = true;
    console.log(item)
    if (confirm("Bạn có muốn xóa tin " + item.tieude)) {
      this._tintuyendungServices.UpdateTin(item).subscribe(data => {
        alert('Bạn đã xóa thành công')
        this.loadData();
      }, erro => {
        this._baseServices.handleError(erro)
      })
    }
  }

  SearchUV(item) {
    console.log(item)
    let a = item.nganhtuyendung[0].idNganh;
    var minluong = "";
    var maxluong = "";
    if (item.thuongluong) {

    } else {
      minluong = item.minluong;
      maxluong = item.maxluong;
    }
    this.router.navigate(['/nhatuyendung/home/thong-tin/ung-vien-da-luu'], { queryParams: { nganh: a ? a : '', thanhpho: item.idThanhpho ? item.idThanhpho : '', minluong: minluong ? minluong : '', maxluong: maxluong ? maxluong : '' } })
  }



  //===========================================================
  //================ THÊM TIN TUYỂN DỤNG ======================
  //===========================================================
  public capbac = Capbac;

  tinmoi = new Tintuyendung()

  SubmitForm(f) {
    if (f.valid) {
      alert("Xong rồi đấy")
    }
  }

  checkValid() {
    if (this.tinmoi.tieude)
      return true;
    return false;
  }


  Themtinmoi() {
    //default
    if (this.tinmoi.thuongluong) {
      this.tinmoi.minluong = null;
      this.tinmoi.maxluong = null;
    }
    this.tinmoi.ngaydang = today;
    this.tinmoi.idDiadiemlamviec *= 1;
    this.tinmoi.idLoaicongviec *= 1;
    this.tinmoi.trangthai = "Chưa duyệt";
    // Update
    if (this.tinmoi.idTintuyendung) {
      if (confirm("Bạn có muốn cập nhập tin tuyển dụng!")) {
        this._tintuyendungServices.UpdateTin(this.tinmoi).subscribe(data => {
          //add ngành
          this._tintuyendungServices.GetNganhtuyendung(this.tinmoi.idTintuyendung).subscribe(data => {
            if (data.length > 0) {
              this._tintuyendungServices.DeleteNganhtuyendung(this.tinmoi.idTintuyendung).subscribe(data => {

                for (let i = 0; i < this.listCM.length; i++) {
                  // add ngành mới tại đây
                  this._tintuyendungServices.CreateNganhtuyendung(this.listCM[i].idNganh, this.tinmoi.idTintuyendung).subscribe(data => {
                    this.resest();
                  })
                }
              });

            }
            else {
              for (let i = 0; i < this.listCM.length; i++) {
                // add ngành mới tại đây
                this._tintuyendungServices.CreateNganhtuyendung(this.listCM[i].idNganh, this.tinmoi.idTintuyendung).subscribe(data => {
                  this.resest();
                })
              }

            }
          })
        }, erro => {
          this._baseServices.handleError(erro)
        })
      } else {

      }
    }
    else {
      if (this.checkValid()) {
        // Add new
        this.tinmoi.idNhatuyendung = +localStorage.getItem('idNTD')
        this._nhatuyendungService.getChitietNTD(+localStorage.getItem('idNTD')).subscribe(data => {
          this.tinmoi.tencongty = data[0].tencongty;
          this._tintuyendungServices.themtintuyendung(this.tinmoi).subscribe(data => {
            this.tinmoi = data;
            // this.tincchuaduyet.push(this.tinmoi)
            this.loadData();
            //add ngành
            for (let i = 0; i < this.listCM.length; i++) {
              // add ngành mới tại đây
              this._tintuyendungServices.CreateNganhtuyendung(this.listCM[i].idNganh, this.tinmoi.idTintuyendung).subscribe(data => {
                alert('Bạn đã tạo tin thành công!')
                this.resest();
              })
            }

          }, erro => {
            this._baseServices.handleError(erro)
          })
        })
      } else {
        alert('Bạn nhập chưa đủ thông tin');
      }
    }
  }

  isckeck = false;

  listNganh: Nganh[] = [];
  listDiadiemlamviec: Diadiemlamviec[] = [];
  loadList() {
    this._baseServices.getAllNganh().subscribe(data => {
      this.listNganh = data.sort((a, b) => (a.tennganh > b.tennganh ? 1 : -1));;
    }, erro => {
      console.log(this._baseServices.handleError(erro))
    })

    this._tintuyendungServices.getDiadiemlamviectheocongty(+localStorage.getItem('idNTD')).subscribe(data => {
      this.listDiadiemlamviec = data;
    }, erro => {
      console.log(this._baseServices.handleError(erro))
    })
  }

  idNganh = 0;

  chuyenmon: Chuyenmon[] = [];

  listCM = [];
  chon = true
  addtoCM(value) {
    for (let i = 0; i < this.listCM.length; i++) {
      if (value === this.listCM[i]) {
        return;
      }
    }
    this.listCM.push(value)

  }

  remove(item) {
    this.listCM.splice(item, 1);

  }

  resest() {
    this.tinmoi = new Tintuyendung();
    this.showdetail = false;
  }

  //===========================================================
  //================ Xóa sửa TIN TUYỂN DỤNG ======================
  //===========================================================
  Sua(item) {
    this.tinmoi = item;
    if (this.tinmoi.ngayhethan) {
      this.tinmoi.ngayhethan = this.tinmoi.ngayhethan.substr(0, 10);
    }
    this._tintuyendungServices.GetNganhtuyendung(this.tinmoi.idTintuyendung).subscribe(data => {
      this.listCM = data
    })
    this.showdetail = true
  }
  Xoa() {

  }


  // phần nội dung modal thêm tin tuyển dụng mới
  tp: Thanhpho[] = [];
  tpModal = 0;
  loadModal() {
    this._thanhphoService.getAllThanhpho().subscribe(data => {
      this.tp = data;
    }, erro => {
      console.log(this._baseServices.handleError(erro))
    })
  }
  //thêm địa điểm làm việc
  onSubmit(f) {
    if (f.valid) {
      let value = new Diadiemlamviec();
      value.diachi = f.value.diachi;
      value.idNhatuyendung = +localStorage.getItem('idNTD');
      value.idThanhpho = +this.tpModal;
      this._tintuyendungServices.ThemDiadiemlamviec(value).subscribe(data => {
        this.listDiadiemlamviec.push(data);
      }, erro => {
        console.log(this._baseServices.handleError(erro))
      })
    }
  }



  checked(item) {
    if (this.chonpl.length > 0) {
      for (let id of this.chonpl) {
        if (id === item) {
          return true;
        }
      }
    }
    return false
  }



  public phucloi = [];
  chonpl = []
  chonPL(item) {
    if (this.chonpl.length > 0) {
      for (let id of this.chonpl) {
        if (id == item) {
          const new_arr = this.chonpl.filter(a => a !== item);
          this.chonpl = new_arr;
          console.log(this.chonpl);
          return
        }
      }
      this.chonpl.push(item);
      console.log(this.chonpl);
    } else {
      this.chonpl.push(item);
      console.log(this.chonpl);
    }

  }

  public getIcon = (serverPath: string) => {
    return `./../../../../../assets/image/iconphucloi/${serverPath}.png`;
    // return `../../../../../assets/image/iconphucloi/${serverPath}.png`;
  }




  //======================================================
  //======================================================
  //           VALIDATO FORM

  Taotinmoi() {
    this.showdetail = true;
    this.isckeck = false;
    this.tinmoi = new Tintuyendung();
    this.idNganh = 0;
    this.listCM = [];
    this._nhatuyendungService.getChitietNTD(+localStorage.getItem('idNTD')).subscribe(data => {
      this.tinmoi.emaillienhe = data[0].email;
      this.tinmoi.sdtlienhe = data[0].sdt;
    })
  }

}
