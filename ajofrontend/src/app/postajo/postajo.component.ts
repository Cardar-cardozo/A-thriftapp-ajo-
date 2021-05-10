import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postajo',
  templateUrl: './postajo.component.html',
  styleUrls: ['./postajo.component.css']
})
export class PostajoComponent implements OnInit {

  public auth = '';
public userid = '';
public ajopost = [];

  constructor( public http: HttpClient, public router: Router) { }

  details(ajo_id){
    this.router.navigate([`/mainnav/details/${ajo_id}`])
  }

  ngOnInit(): void {
    this.auth = localStorage.token
let auth = JSON.parse(atob(this.auth.split('.')[1]));
this.userid = auth.user;

this.http.post<any>('http://localhost/ajo/ajobackend/getpost.php', (this.userid)).subscribe(
      data => {
      
      // this.image = data.image
      // this.firstname = data.firstname
      // this.amount = data.amount
      this.ajopost = data.Ajopost;
      console.log(this.ajopost)
      
      
      })

  }

}
