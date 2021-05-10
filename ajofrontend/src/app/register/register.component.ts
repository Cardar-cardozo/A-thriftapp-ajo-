import { Component, OnInit } from '@angular/core';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userform: FormGroup;
  baseUrl = environment.baseUrl;

  constructor(public fb: FormBuilder, public http:HttpClient, public _get:SignupService) {
    this.userform = this.fb.group({
      firstname : ['', [Validators.required, Validators.minLength(5)]],
      lastname : ['', [Validators.required, Validators.minLength(5)]],
      email : ['', [Validators.required, Validators.email, ]],
      password : ['', [Validators.required, Validators.minLength(8)]],
      // lastname : ['', [Validators.required, Validators.minLength(5)]],
    })
   }

  ngOnInit(): void {
  }

  submit(){
    if(this.userform.valid){
    let value = this.userform.value;
    this.http.post<any>('http://localhost:80/ajo/ajobackend/register.php', JSON.stringify(value)).subscribe(res=>{
      // localStorage.setItem('token', res.data)
      console.log(res)
      
      },
      err=>{console.log(err)}
      )

    // console.log(value)

    // this.http.get<any>('https://jsonplaceholder.tys').subscribe(
    //   res=>{
    //     console.log(res)
    //   },
    //   err=>{console.log(err)}

    // )
  } else {
    console.log('invalid')
  }
  }

}
