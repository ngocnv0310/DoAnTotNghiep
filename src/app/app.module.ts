// import { AuthServiceConfig } from 'angularx-social-login';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './UNGVIEN/components/home/home.component';
import { LoginComponent } from './UNGVIEN/components/login/login.component';
import { DangkyComponent } from './UNGVIEN/components/dangky/dangky.component';
import { VieclamComponent } from './UNGVIEN/components/vieclam/vieclam/vieclam.component';
import { VieclamListComponent } from './UNGVIEN/components/vieclam/vieclam-list/vieclam-list.component';
import { VieclamDetailComponent } from './UNGVIEN/components/vieclam/vieclam-detail/vieclam-detail.component';
import { NhatuyendungComponent } from './NHATUYENDUNG/components/nhatuyendung/nhatuyendung.component';
import { HomelayoutComponent } from './UNGVIEN/components/homelayout/homelayout.component';
import { PageNotFoundComponent } from './UNGVIEN/components/page-not-found/page-not-found.component';
import { HeaderComponent } from './UNGVIEN/components/header/header.component';
import { FooterComponent } from './UNGVIEN/components/footer/footer.component';
import { InfoUserComponent } from './UNGVIEN/components/info-user/info-user.component';
import { JwtInterceptor } from './UNGVIEN/services/jwtinterceptor';
import { LocComponent } from './UNGVIEN/components/vieclam/loc/loc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { CongvieckhacComponent } from './UNGVIEN/components/vieclam/vieclam-detail/congvieckhac/congvieckhac.component';
import { ThongtinComponent } from './UNGVIEN/components/vieclam/vieclam-detail/thongtin/thongtin.component';
import { CongtyComponent } from './UNGVIEN/components/vieclam/vieclam-detail/congty/congty.component';
import { ListComponent } from './UNGVIEN/components/vieclam/vieclam-list/list/list.component';
import { QuanlyhosoComponent } from './UNGVIEN/components/info-user/quanlyhoso/quanlyhoso.component';
import { VieclamdaluuComponent } from './UNGVIEN/components/info-user/vieclamdaluu/vieclamdaluu.component';
import { VieclamdaungtuyenComponent } from './UNGVIEN/components/info-user/vieclamdaungtuyen/vieclamdaungtuyen.component';
import { VieclamquanlyComponent } from './UNGVIEN/components/vieclam/vieclamquanly/vieclamquanly.component';
import { ListCongtyComponent } from './UNGVIEN/components/list-congty/list-congty.component';
import { AllCongTyComponent } from './UNGVIEN/components/list-congty/all-cong-ty/all-cong-ty.component';
import { LayoutNTDComponent } from './NHATUYENDUNG/layout-ntd.component';
import { UserInfoComponent } from './NHATUYENDUNG/components/user-info/user-info.component';
import { LoginNTDComponent } from './NHATUYENDUNG/components/login-ntd/login-ntd.component';
import { DangkyNTDComponent } from './NHATUYENDUNG/components/dangky-ntd/dangky-ntd.component';
import { HomeNTDComponent } from './NHATUYENDUNG/components/home-ntd/home-ntd.component';
import { HeaderNTDComponent } from './NHATUYENDUNG/components/header-ntd/header-ntd.component';
import { FooterNTDComponent } from './NHATUYENDUNG/components/footer-ntd/footer-ntd.component';
import { ThongtincongtyComponent } from './NHATUYENDUNG/components/user-info/thongtincongty/thongtincongty.component';
import { ThongtintuyendungComponent } from './NHATUYENDUNG/components/user-info/thongtintuyendung/thongtintuyendung.component';
import { DanhsachungtuyenComponent } from './NHATUYENDUNG/components/user-info/danhsachungtuyen/danhsachungtuyen.component';
import { DanhsachdaluuComponent } from './NHATUYENDUNG/components/user-info/danhsachdaluu/danhsachdaluu.component';
import { ChitietungtuyenComponent } from './NHATUYENDUNG/components/user-info/chitietungtuyen/chitietungtuyen.component';
import { ThongtintungvienComponent } from './NHATUYENDUNG/components/user-info/thongtintungvien/thongtintungvien.component';
import { CatchuoiPipe } from './UNGVIEN/pipe/catchuoi.pipe';
import { SafePipe } from './UNGVIEN/pipe/safe.pipe';
import { ChitietungvienComponent } from './NHATUYENDUNG/components/user-info/chitietungvien/chitietungvien.component';
import { ChitietcongtyComponent } from './UNGVIEN/components/list-congty/chitietcongty/chitietcongty.component';
import { ThongbaovieclamComponent } from './UNGVIEN/components/info-user/thongbaovieclam/thongbaovieclam.component';
import { TaothongbaoComponent } from './UNGVIEN/components/info-user/taothongbao/taothongbao.component';
import { BannerAdsDocComponent } from './UNGVIEN/components/banner-ads-doc/banner-ads-doc.component';
import { EllipsisPipe } from './UNGVIEN/pipe/ellipsis.pipe';
import { SlideCongtyComponent } from './UNGVIEN/components/list-congty/slide-congty/slide-congty.component';
import { SlideCongty1Component } from './UNGVIEN/components/list-congty/slide-congty/slide-congty1/slide-congty1.component';
import { SlideCongty2Component } from './UNGVIEN/components/list-congty/slide-congty/slide-congty2/slide-congty2.component';
import { NumToArrPipe } from './UNGVIEN/pipe/num-to-arr.pipe';
import { VieclamkhuvucComponent } from './UNGVIEN/components/vieclam/vieclamkhuvuc/vieclamkhuvuc.component';
import { VieclamtheonganhngheComponent } from './UNGVIEN/components/vieclam/vieclamtheonganhnghe/vieclamtheonganhnghe.component';
import {
  SocialLoginModule, 
  AuthServiceConfig,
  GoogleLoginProvider, 
  FacebookLoginProvider, 
  LinkedinLoginProvider
} from 'ng-social-login-module';
import { LienheComponent } from './UNGVIEN/components/lienhe/lienhe.component';
import { ThoathuansudungComponent } from './UNGVIEN/components/thoathuansudung/thoathuansudung.component';
import { QuydinhbaonhatComponent } from './UNGVIEN/components/quydinhbaonhat/quydinhbaonhat.component';
import { GioithieuJEEJOBComponent } from './UNGVIEN/components/gioithieu-jeejob/gioithieu-jeejob.component';

const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('908194614946-21iuesj1i3itt08m65tkq1i9nrqvgfmk.apps.googleusercontent.com')
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('Facebook-App-Id')
  // },
  // {
  //   id: LinkedinLoginProvider.PROVIDER_ID,
  //   provider: new LinkedinLoginProvider('LINKEDIN_CLIENT_ID')
  // }
], true);
 
export function provideConfig() {
  return CONFIG;
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DangkyComponent,
    VieclamComponent,
    VieclamListComponent,
    VieclamDetailComponent,
    NhatuyendungComponent,
    HomelayoutComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    InfoUserComponent,
    LocComponent,
    CongvieckhacComponent,
    ThongtinComponent,
    CongtyComponent,
    ListComponent,
    QuanlyhosoComponent,
    VieclamdaluuComponent,
    VieclamdaungtuyenComponent,
    VieclamquanlyComponent,
    ListCongtyComponent,
    AllCongTyComponent,
    LayoutNTDComponent,
    UserInfoComponent,
    LoginNTDComponent,
    DangkyNTDComponent,
    HomeNTDComponent,
    HeaderNTDComponent,
    FooterNTDComponent,
    ThongtincongtyComponent,
    ThongtintuyendungComponent,
    DanhsachungtuyenComponent,
    DanhsachdaluuComponent,
    ChitietungtuyenComponent,
    ThongtintungvienComponent,
    CatchuoiPipe,
    SafePipe,
    ChitietungvienComponent,
    ChitietcongtyComponent,
    ThongbaovieclamComponent,
    TaothongbaoComponent,
    BannerAdsDocComponent,
    EllipsisPipe,
    SlideCongtyComponent,
    SlideCongty1Component,
    SlideCongty2Component,
    NumToArrPipe,
    VieclamkhuvucComponent,
    VieclamtheonganhngheComponent,
    LienheComponent,
    ThoathuansudungComponent,
    QuydinhbaonhatComponent,
    GioithieuJEEJOBComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    CommonModule,
    SocialLoginModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
       useClass: JwtInterceptor,
        multi: true
      },
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
