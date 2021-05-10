import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(public http: HttpClient) { }
  public auth = '';
  public image = ''
  public baseurl = 'http://localhost/ajo/ajobackend/uploads/';
  public firstname = '';
  public amount = '';

  ngOnInit(): void {
    this.auth = localStorage.token
    this.http.post<any>('http://localhost/ajo/ajobackend/profiledetails.php', (this.auth)).subscribe(
      data => {
      
      this.image = data.image
      this.firstname = data.firstname
      this.amount = data.amount
      console.log(data)
      
      
      })
  }

}
