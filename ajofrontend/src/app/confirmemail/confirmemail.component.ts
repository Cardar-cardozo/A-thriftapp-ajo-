import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.css']
})
export class ConfirmemailComponent implements OnInit {

  
  constructor(public http: HttpClient) { }
  public auth = '';
  public image = ''
  public baseurl = 'http://localhost/ajo/ajobackend/uploads/';
  public firstname = '';
  public email = '';
  public code = '';


  login(){
    let vet = {ver:this.code}
    this.http.post<any>('http://localhost/ajo/ajobackend/confirmemail.php', (vet)).subscribe(
      data => {
      
      console.log(data);
      console.log(vet)
      
      
      })
  }

  ngOnInit(): void {
    this.auth = localStorage.token
    this.http.post<any>('http://localhost/ajo/ajobackend/profiledetails.php', (this.auth)).subscribe(
      data => {
      
      this.image = data.image
      this.firstname = data.firstname
      this.email = data.email
        
      console.log(data)
      
      
      })

      this.http.post<any>('http://localhost/ajo/ajobackend/sendcode.php', (this.auth)).subscribe(
        data => {
        
        // this.image = data.image
        // this.firstname = data.firstname
        // this.email = data.email
          
        console.log(data)
        
        
        })
  }

}
