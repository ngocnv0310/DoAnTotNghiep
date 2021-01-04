import { Router } from '@angular/router';
import { Component, OnInit, Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-slide-congty1',
  templateUrl: './slide-congty1.component.html',
  styleUrls: ['./../slide-congty.component.css']
})
export class SlideCongty1Component implements OnInit, OnChanges {

  
  @Input('congty') congty = [];

  constructor(
    public router:Router
  ) { }

  congviecmogmuon: any;

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(this.congty);
    this.congty.sort((a,b) => (a.ngaytao > b.ngaytao) ? 1:-1).slice(0,9);
    this.loadData2();
  }



  indexlist = 1;
  onchange1() {
    this.loadData2()
  }
  listTest = [];
  loadData2() {
    let num = 3;
    this.listTest = (this.congty.slice(num * (this.indexlist - 1), num * this.indexlist));
    console.log(this.listTest);
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44309/${serverPath}`;
  }

  Xemntd(item) {
    this.router.navigate(['/congty/chi-tiet-cong-ty/', item.idNhatuyendung])
  }



  dataslide2 = 1;
  changeData2($value) {
    this.dataslide2 = $value + 1
  }
}
