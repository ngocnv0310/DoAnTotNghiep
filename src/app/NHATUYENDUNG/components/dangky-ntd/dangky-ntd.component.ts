import { Nganh } from 'src/app/UNGVIEN/models/Base.class';
import { ROOT_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { Ungvien } from './../../../UNGVIEN/models/ungvien.class';
import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/UNGVIEN/services/base.service';
import { LoginService } from 'src/app/UNGVIEN/services/login.service';
import { Nhatuyendung } from 'src/app/UNGVIEN/models/nhatuyendung.class';

@Component({
  selector: 'app-dangky-ntd',
  templateUrl: './dangky-ntd.component.html',
  styleUrls: ['./dangky-ntd.component.css']
})
export class DangkyNTDComponent implements OnInit {
  constructor(
    public baseService: BaseService,
    public loginService: LoginService,
    public uv: UngvienService,
    public ntd: NhatuyendungService,
    public router: Router,
    public http: HttpClient
  ) { }

  checked = false;
  isSigup = false;
  OTP = "";
  maxacthuc = "";
  code = "";
  XacnhanOTP() {
    this.OTP = (Math.floor(Math.random() * (999999 - 111111)) + 111111).toString();
    console.log(this.OTP);
    this.baseService.SendMail(this.congty.email, this.OTP).subscribe(data => {
      this.code = "Đã gửi mã OTP đến mail của bạn! Vui Lòng xác nhận!"

    }, erro => {
      this.code = "Gửi mã OTP thất bại."
      console.log(this.baseService.handleError(erro));
    })
  }

  Confirm() {
    if (this.maxacthuc == this.OTP) {
      console.log("Xác nhận")
      this.Dangkytaikhoan();
    } else {
      console.log("Mã otp chưa chính xác")
    }
  }

  Dangkytaikhoan() {
    this.congty.logo = "Resources/Images/company.jpg";
    this.congty.bannercongty = "Resources/Images/banner_new.jpg";
    this.loginService.dangKytaikhoanNTD(this.congty).subscribe(data => {
      console.log(data)
      alert('bạn đã tạo tài khoản thành công');
      this.router.navigate(['/dang-nhap-cong-ty']);
    }, erro => {
      console.log(this.baseService.handleError);
    })
  }

  ngOnInit(): void {
    this.LoadData();
  }

  listnganh: Nganh[] = [];
  LoadData() {
    this.congty.nganhnghehoatdong = 0;
    this.baseService.getAllNganh().subscribe(data => {
      this.listnganh = data;
    })
  }

  rp;

  checkValid(value) {
    if (this.congty.email && this.rp && this.congty.matkhau.length >= 6) {
      if (this.congty.nganhnghehoatdong == 0) {
        this.congty.nganhnghehoatdong = null;
      }else{
      this.congty.nganhnghehoatdong *= 1;
      }
      
      console.log(value)
      if (value == this.congty.matkhau) {
        this.http.get(ROOT_URL + "api/kiemtraemail/" + this.congty.email).subscribe(data => {
          if (data) {
            alert('Email đã tồn tại trên hệ thống');
          } else {
            this.XacnhanOTP();
            this.isSigup = true;
          }
        })
      }
      else
        console.log("Mật khẩu k trùng")
    }else{
      alert('out')
    }
  }

  congty = new Nhatuyendung();

  Dangky(value) {
    debugger
    console.log(value)
    this.congty.nganhnghehoatdong *= 1;
    if (value == this.congty.matkhau) {
      this.http.get(ROOT_URL + "api/kiemtraemail/" + this.congty.email).subscribe(data => {
        if (data) {
          alert('Email đã tồn tại trên hệ thống');
        } else {
          this.XacnhanOTP();
          this.isSigup = true;

        }
      })
    }
    else
      console.log("Mật khẩu k trùng")

  }

}
