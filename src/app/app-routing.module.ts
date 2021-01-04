import { ThongbaovieclamComponent } from './UNGVIEN/components/info-user/thongbaovieclam/thongbaovieclam.component';
import { ChitietungvienComponent } from './NHATUYENDUNG/components/user-info/chitietungvien/chitietungvien.component';
import { ThongtintungvienComponent } from './NHATUYENDUNG/components/user-info/thongtintungvien/thongtintungvien.component';
import { ChitietungtuyenComponent } from './NHATUYENDUNG/components/user-info/chitietungtuyen/chitietungtuyen.component';
import { DanhsachdaluuComponent } from './NHATUYENDUNG/components/user-info/danhsachdaluu/danhsachdaluu.component';
import { ThongtintuyendungComponent } from './NHATUYENDUNG/components/user-info/thongtintuyendung/thongtintuyendung.component';
import { ThongtincongtyComponent } from './NHATUYENDUNG/components/user-info/thongtincongty/thongtincongty.component';
import { UserInfoComponent } from './NHATUYENDUNG/components/user-info/user-info.component';
import { DangkyNTDComponent } from './NHATUYENDUNG/components/dangky-ntd/dangky-ntd.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//components
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
import { InfoUserComponent } from './UNGVIEN/components/info-user/info-user.component';
import { CongtyComponent } from './UNGVIEN/components/vieclam/vieclam-detail/congty/congty.component';
import { CongvieckhacComponent } from './UNGVIEN/components/vieclam/vieclam-detail/congvieckhac/congvieckhac.component';
import { ThongtinComponent } from './UNGVIEN/components/vieclam/vieclam-detail/thongtin/thongtin.component';
import { QuanlyhosoComponent } from './UNGVIEN/components/info-user/quanlyhoso/quanlyhoso.component';
import { VieclamdaluuComponent } from './UNGVIEN/components/info-user/vieclamdaluu/vieclamdaluu.component';
import { VieclamdaungtuyenComponent } from './UNGVIEN/components/info-user/vieclamdaungtuyen/vieclamdaungtuyen.component';
import { VieclamquanlyComponent } from './UNGVIEN/components/vieclam/vieclamquanly/vieclamquanly.component';
import { ListCongtyComponent } from './UNGVIEN/components/list-congty/list-congty.component';
import { AllCongTyComponent } from './UNGVIEN/components/list-congty/all-cong-ty/all-cong-ty.component';
import { LayoutNTDComponent } from './NHATUYENDUNG/layout-ntd.component';
import { LoginNTDComponent } from './NHATUYENDUNG/components/login-ntd/login-ntd.component';
import { HomeNTDComponent } from './NHATUYENDUNG/components/home-ntd/home-ntd.component';
import { DanhsachungtuyenComponent } from './NHATUYENDUNG/components/user-info/danhsachungtuyen/danhsachungtuyen.component';
import { ChitietcongtyComponent } from './UNGVIEN/components/list-congty/chitietcongty/chitietcongty.component';
import { VieclamkhuvucComponent } from './UNGVIEN/components/vieclam/vieclamkhuvuc/vieclamkhuvuc.component';
import { VieclamtheonganhngheComponent } from './UNGVIEN/components/vieclam/vieclamtheonganhnghe/vieclamtheonganhnghe.component';
import { LienheComponent } from './UNGVIEN/components/lienhe/lienhe.component';
import { ThoathuansudungComponent } from './UNGVIEN/components/thoathuansudung/thoathuansudung.component';
import { QuydinhbaonhatComponent } from './UNGVIEN/components/quydinhbaonhat/quydinhbaonhat.component';
import { GioithieuJEEJOBComponent } from './UNGVIEN/components/gioithieu-jeejob/gioithieu-jeejob.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ungvien',
    pathMatch: 'full',
  },
  { path: 'dang-nhap-ung-vien', component: LoginComponent },
  { path: 'dang-ky-ung-vien', component: DangkyComponent },
  {
    path: 'congty/chi-tiet-cong-ty/:id',
    component: ChitietcongtyComponent,
  },
  { path: 'dang-nhap-cong-ty', component: LoginNTDComponent },
  { path: 'dang-ky-cong-ty', component: DangkyNTDComponent },
  {
    path: 'ungvien',
    component: HomelayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'index', component: HomeComponent },
      { path: 'viec-lam-quan-ly', component: VieclamquanlyComponent },
      { path: 'danh-sach-cong-ty', component: ListCongtyComponent },
      { path: 'viec-lam-theo-khu-vuc', component: VieclamkhuvucComponent },
      { path: 'viec-lam-theo-nganh', component: VieclamtheonganhngheComponent },
      { path: 'tat-ca-cong-ty', component: AllCongTyComponent },
      { path: 'gioi-thieu', component: GioithieuJEEJOBComponent },
      { path: 'lien-he', component: LienheComponent},
      { path: 'thoa-thuan-su-dung', component: ThoathuansudungComponent },
      { path: 'quy-dinh-bao-mat', component: QuydinhbaonhatComponent },
      { path: 'user',
        component: InfoUserComponent,
        children: [
          {
            path: '',
            component: QuanlyhosoComponent,
          },
          {
            path: 'hoso',
            component: QuanlyhosoComponent,
          },
          {
            path: 'viecdaluu',
            component: VieclamdaluuComponent,
          },
          {
            path: 'vieclamungtuyen',
            component: VieclamdaungtuyenComponent,
          },
          {
            path: 'thong-bao-viec-lam',
            component: ThongbaovieclamComponent,
          },
        ],
      },
      {
        path: 'vieclam/:id',
        component: VieclamDetailComponent,
        children: [
          {
            path: '',
            component: ThongtinComponent,
          },
          {
            path: 'thongtin',
            component: ThongtinComponent,
          },
          {
            path: 'congvieckhac',
            component: CongvieckhacComponent,
          },
          {
            path: 'congty',
            component: CongtyComponent,
          },
        ],
      },
      {
        path: 'vieclam',
        component: VieclamComponent,
        children: [
          { path: '', component: VieclamListComponent },
          { path: 'list', component: VieclamListComponent },
        ],
      }
    ],
  },
  {
    path: 'nhatuyendung',
    component: LayoutNTDComponent,
    children: [
      {
        path: '',
        redirectTo: '/dang-nhap-cong-ty',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeNTDComponent,
        children: [
          {
            path: '',
            redirectTo: '/nhatuyendung/home/thong-tin',
            pathMatch: 'full',
          },
          {
            path: 'thong-tin',
            component: UserInfoComponent,
            children: [
              {
                path: '',
                component: ThongtincongtyComponent,
              },
              {
                path: 'cong-ty',
                component: ThongtincongtyComponent,
              },
              {
                path: 'tuyen-dung',
                component: ThongtintuyendungComponent,
              },
              {
                path: 'ung-vien-da-luu',
                component: DanhsachdaluuComponent,
              },
              {
                path: 'ung-vien-da-ung-tuyen',
                component: DanhsachungtuyenComponent,
              },
              {
                path: 'chi-tiet-ung-tuyen/:id',
                component: ChitietungtuyenComponent,
              },
              {
                path: 'chi-tiet-ung-vien',
                component: ThongtintungvienComponent,
              },
              {
                path: 'chi-tiet-ung-vien/:id',
                component: ChitietungvienComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
