import { ThanhphoService } from './../../../services/thanhpho.service';
import { BaseService } from './../../../services/base.service';
import { Thanhpho } from './../../../models/thanhpho';
import { Nganh } from './../../../models/Base.class';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Nhatuyendung } from 'src/app/UNGVIEN/models/nhatuyendung.class';
import { NhatuyendungService } from 'src/app/UNGVIEN/services/nhatuyendung.service';

@Component({
  selector: 'app-all-cong-ty',
  templateUrl: './all-cong-ty.component.html',
  styleUrls: ['./all-cong-ty.component.css']
})
export class AllCongTyComponent implements OnInit {

  nhatuyendung = [];
  
  lstnganh:Nganh[] = [];
  lstkhuvuc:Thanhpho[] = [];

  constructor(
    public _ntdService: NhatuyendungService,
    public base: BaseService,
    public tp: ThanhphoService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  nganh = 0;
  khuvuc = 0;
  text = '';


  ngOnInit(): void {
    // load param
    this.activatedRoute.queryParams.subscribe(data => {
      if (data['nganh']) {
        this.nganh = +data['nganh'];
        console.log(this.nganh);
      }
      if (data['khuvuc']) {
        this.khuvuc = +data['khuvuc'];
        console.log(this.khuvuc);
      }
      if (data['text']) {
        this.text = data['text'];
        console.log(this.text);
      }
    });
    this.loadData();
  }

  onseach(array) {
    let rs;
    rs = (array.filter(x => {
      return x.tencongty.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) != -1;
    }))
    // (this.nganh == 0 && this.khuvuc == 0
    if (this.nganh > 0) {
      rs = rs.filter(x => {
        return x.nganhnghehoatdong == this.nganh;
      })
    }
    if (this.khuvuc > 0) {
      rs = (rs.filter(x => {
        for (let id of x.diadiemlamviec) {
          if(id.idThanhpho == this.khuvuc){
            console.log(id.idThanhpho,this.khuvuc)
          return id.idThanhpho == this.khuvuc;
          }
        }
      }));
    }
    return rs;
  }

  loadData() {

    this.base.getAllNganh().subscribe(data =>{
      this.lstnganh = data
    })
    this.tp.getAllThanhpho().subscribe(data =>{
      this.lstkhuvuc = data
    })


    this.getNTD();
  }

  getDate() {
    var todayTime = new Date();
    var month = (todayTime .getMonth());
    var day = (todayTime .getDate());
    var year = (todayTime .getFullYear());
    var dd=day.toString();
    var MM=month.toString();
    if(month<10){
        MM = "0"+ month;
    }
    if(day<10){
        dd = "0"+ day;
    }
    return year +"-"+ MM +"-" + dd;
}


  getNTD() {
    this._ntdService.getAllnhatuyendung().subscribe(data => {
      this.nhatuyendung = this.onseach(data);
      this.nhatuyendung = this.nhatuyendung.filter(z => {
        if(z.logo && z.hinhanh && z.bannercongty ){
          z.tinmoi=false;
          if((new Date( z.ngaydangky ).getTime()) > (new Date(this.getDate()).getTime())){
            z.tinmoi = true;
          }
          return z;
        }
      })
      this.nhatuyendung.sort((a,b) =>( (new Date( a.ngaydangky ).getTime()) > (new Date(b.ngaydangky).getTime()) )  ? -1: 1);
      console.log(this.nhatuyendung)
      this.totalPage = Math.ceil(this.nhatuyendung.length/this.maxSize)
      this.nhatuyendung = this.nhatuyendung.slice(this.maxSize*(this.pageNumber-1),this.maxSize*this.pageNumber);
    });
  }

  //

  

  // load image 
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }


  Xemchitiet(item) {
    console.log(item)
    this.router.navigate(['/congty/chi-tiet-cong-ty/', item.idNhatuyendung])
  }

  searchCongty(nganhs,khuvucs,texts){
    console.log(nganhs,khuvucs,texts)
    this.router.navigate(['/ungvien/tat-ca-cong-ty'],{queryParams:{nganh:nganhs ? nganhs : '',khuvuc:khuvucs ? khuvucs : '',text:texts ? texts : ''}});
    //{ queryParams:{ungvien:item.idUngvien ? item.idUngvien : '',tintuyendung:this.handleParams() ? this.handleParams():''}});
    this.loadData();
  }

  // nội dung phân trang
  maxSize = 12;     // số tin trong mỗi trang 
  pageNumber = 1;   // trang bắt đầu  
  totalPage = 0;  // tổng các trang
  page = [];// get page


  chuyentrang(item) {
    if (item <= this.totalPage && item != this.pageNumber) {
      this.pageNumber = item;
      console.log(item)
      this.getNTD();
    }
  }


}
