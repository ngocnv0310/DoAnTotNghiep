import { Injectable } from '@angular/core';
import { ROOT_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Thanhpho } from '../models/thanhpho';

@Injectable({
  providedIn: 'root'
})
export class ThanhphoService {

  public baseURL = ROOT_URL;
  constructor(
    public http:HttpClient
  ) { }

  getAllThanhpho(){
    return this.http.get<Thanhpho[]>(this.baseURL+"api/thanhphoes")
  }
}
