import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  public arr = [];
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) { }

  public adduser() {
    // this.arr.push(value)
    // console.log(this.arr);

  // return this.http.post<any>(`${this.baseUrl}`)
  }


}
