import { ROOT_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UngvienService } from 'src/app/UNGVIEN/services/ungvien.service';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';
import { Ungvien } from 'src/app/UNGVIEN/models/ungvien.class';
import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {

  constructor(
    public baseService: BaseService,
    public loginService: LoginService,
    public uv: UngvienService,
    public ntd: NhatuyendungService,
    public router: Router,
    public http: HttpClient
  ) { }

  isSigup = false;
  OTP = "";
  maxacthuc = "";
  code = "";
  XacnhanOTP() {
    this.OTP = (Math.floor(Math.random() * (999999 - 111111)) + 111111).toString();
    console.log(this.OTP);
    this.baseService.SendMail(this.ungvien.email, this.OTP).subscribe(data => {
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

  ngOnInit(): void {
  }
  clicked = false;
  ungvien = new Ungvien();
  Dangky(ho, ten, mail, pass, value) {
    this.clicked = true;
    if (ho.valid, ten.valid, mail.valid, pass.valid) {
      if (value == this.ungvien.matkhau) {
        this.http.get(ROOT_URL + "api/kiemtraemail/" + this.ungvien.email).subscribe(data => {
          if (data) {
            this.code = "Email đã tồn tại trên hệ thống. Vui lòng chọn mail khác để đăng ký"
          } else {
            this.isSigup = true
            this.XacnhanOTP();
          }
        })

      }
      else
        console.log("Mật khẩu chưa khớp")
    }
  }

  Dangkytaikhoan() {
    this.ungvien.hinhanh = "Resources/Images/user.jpg";
    this.loginService.dangKytaikhoan(this.ungvien).subscribe(data => {
      console.log(data)
      alert('bạn đã tạo tài khoản thành công');
      this.router.navigate(['/dang-nhap-ung-vien']);
    }, erro => {
      console.log(this.baseService.handleError);
    })
  }

}
