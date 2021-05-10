import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  public email ;
  public password ;


  constructor( public http:HttpClient,) { }

  ngOnInit(): void {
  }

  login(){
    
    if (this.email === '' || this.password === '') {
      console.log('empty');
    }
     else {

      let det = {email : this.email, password : this.password}
      console.log(det)

      this.http.post<any>('http://localhost:80/ajo/ajobackend/login.php', JSON.stringify(det)).subscribe(res=>{
      localStorage.setItem('token', res.Auth)
      console.log(res)
      
      },
      err=>{console.log(err)}
      )
    }

   
  }

}
