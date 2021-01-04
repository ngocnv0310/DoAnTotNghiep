import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  step='step1';
  //contructor
  constructor(
  ) {
  }
  public show: boolean = false;

  ngOnInit(): void {
    
  }


}
