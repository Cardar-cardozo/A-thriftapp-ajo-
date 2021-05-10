import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public auth = '';
  public image = ''
  public baseurl = 'http://localhost/ajo/ajobackend/uploads/';
  public firstname = '';
  public amount = '';
  public suc = true
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.auth = localStorage.token
    this.http.post<any>('http://localhost/ajo/ajobackend/profiledetails.php', (this.auth)).subscribe(
      data => {
      
      this.image = data.image
      this.firstname = data.firstname
      this.amount = data.amount
      console.log(data)
      
      
      })

      setTimeout(() => {
        this.suc = false
      }, 2000);

  }

}
