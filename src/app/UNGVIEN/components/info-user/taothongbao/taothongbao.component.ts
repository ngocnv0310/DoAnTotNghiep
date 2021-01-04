import { Thanhpho } from './../../../models/thanhpho';
import { Congviecmongmuon, Nganh, Loaicongviec } from './../../../models/Base.class';
import { Capbac } from './../../../models/dataDropdown';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../../services/base.service';
import { UngvienService } from './../../../services/ungvien.service';
import { ThanhphoService } from './../../../services/thanhpho.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-taothongbao',
  templateUrl: './taothongbao.component.html',
  styleUrls: ['./taothongbao.component.css']
})
export class TaothongbaoComponent implements OnInit {

  @Output('luuData') onsubmit = new EventEmitter<any>();

  public thanhphos: Thanhpho[] = [];
  public listNganh: Nganh[] = [];
  public listLoaicongviec: Loaicongviec[] = [];
  constructor(
    public _thanhphoService: ThanhphoService,
    public _ungvienService: UngvienService,
    public _baseService: BaseService,
    private http: HttpClient
  ) { }

  public show: boolean = false;

  ngOnInit(): void {
    this.loadCongviecmongmuon();
    this.loadData();
  }


  public phucloi = [];

  loadData() {
    // lấy list nganh
    this._baseService.getAllNganh().subscribe(data => {
      this.listNganh = data;
    }, erro => {
      this._baseService.handleError(erro);
    });


    this._baseService.getAllphucloi().subscribe(data => {
      this.phucloi = data.slice(0, data.length - 1);
    });

    //get data thanh pho 
    this._thanhphoService.getAllThanhpho().subscribe(data => {
      this.thanhphos = data;
    })

    // lấy list loại công việc
    this._baseService.getAllLoaicongviec().subscribe(data => {
      this.listLoaicongviec = data;
    }, erro => {
      this._baseService.handleError(erro);
    })

  }



  public capbac = Capbac;
  //======================================================
  //công việc mong muốn
  congviecmongmuon = new Congviecmongmuon();
  submitCongviec() {
    this.onsubmit.emit(true);
    this.congviecmongmuon.idUngvien = +localStorage.getItem('idUser');
    this.congviecmongmuon.idLoaicongviec = +this.congviecmongmuon.idLoaicongviec;
    this.congviecmongmuon.idNganh = +this.congviecmongmuon.idNganh;
    this.congviecmongmuon.luong = +this.congviecmongmuon.luong;
    console.log(this.congviecmongmuon);
    // if (this.congviecmongmuon.idCongviecmongmuon) {
    //   console.log(JSON.stringify(this.congviecmongmuon));
    //   this._ungvienService.UpdateCongviecmongmuon(this.congviecmongmuon).subscribe(data => {
    //     console.log('update');
    //     console.log(this.listTP);
    //     console.log(this.dsNganh);
    //     // update nơi làm việc
    //     this._ungvienService.GetnoilamviectheoCongviecmongmuon(this.congviecmongmuon.idCongviecmongmuon).subscribe(
    //       data => {
    //         if (data.length > 0) {
    //           this._ungvienService.DeletenoilamviectheoCongviecmongmuon(this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
    //             console.log('đã xóa');
    //             for (let i of this.listTP) {
    //               // add nơi làm việc mới tại đây
    //               this._ungvienService.CreateKhuVucmongmuon(i.idThanhpho, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
    //                 console.log(data);
    //                 this.loadCongviecmongmuon();
    //               })
    //             }
    //           })
    //         }
    //         else{
    //           for (let i of this.listTP) {
    //             // add nơi làm việc mới tại đây
    //             this._ungvienService.CreateKhuVucmongmuon(i.idThanhpho, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
    //               console.log(data);
    //               this.loadCongviecmongmuon();
    //             })
    //           }
    //         }

    //       }
    //     );
    //     // update ngành
    //     this._ungvienService.GetnganhnghetheoCongviecmongmuon(this.congviecmongmuon.idCongviecmongmuon).subscribe(
    //       data => {
    //         if (data.length > 0) {
    //           this._ungvienService.DeleteNganhnghemongmuon(this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
    //             console.log('đã xóa');
    //             for (let i = 0; i < this.listTP.length; i++) {
    //               // add ngành mới tại đây
    //               this._ungvienService.CreateNganhnghemongmuon(this.dsNganh[i].idNganh, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
    //                 console.log(data);
    //                 this.loadCongviecmongmuon();
    //               })
    //             }
    //           })
    //         }
    //         else{
    //           for (let i = 0; i < this.listTP.length; i++) {
    //             // add ngành mới tại đây
    //             this._ungvienService.CreateNganhnghemongmuon(this.dsNganh[i].idNganh, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
    //               console.log(data);
    //               this.loadCongviecmongmuon();
    //             })
    //           }
    //         }
    //       }
    //     );
    //     this.loadCongviecmongmuon();
    //   });
    // } else {
    this._ungvienService.CreateCongviecmongmuon(this.congviecmongmuon).subscribe(data => {
      this.congviecmongmuon = data;
      console.log(this.congviecmongmuon);
      for (let i = 0; i < this.listTP.length; i++) {
        // add ngành mới tại đây
        this._ungvienService.CreateKhuVucmongmuon(this.listTP[i].idThanhpho, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
          console.log(data);
        })
      }
      for (let i = 0; i < this.dsNganh.length; i++) {
        // add ngành mới tại đây
        this._ungvienService.CreateNganhnghemongmuon(this.dsNganh[i].idNganh, this.congviecmongmuon.idCongviecmongmuon).subscribe(data => {
          console.log(data);
        })
      }
      debugger
      this.loadCongviecmongmuon();
    });
    // }
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

  listCVungvien = [];
  loadCongviecmongmuon() {
    // this._ungvienService.getCongviecmongmuontheoUV(localStorage.getItem('idUser')).subscribe(data => {
    //   this.listCVungvien = data;
    //   for (let item of this.listCVungvien) {
    //     this._ungvienService.GetnoilamviectheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(dt => {
    //       item.thanhpho = dt;
    //     })
    //     this._ungvienService.GetnganhnghetheoCongviecmongmuon(item.idCongviecmongmuon).subscribe(dt => {
    //       item.nganhnghe = dt;
    //     })
    //   }
    // })
  }

  XoaCongviecmongmuon(item) {
    alert('xóa')
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
    this.onsubmit.emit(false);
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

}
