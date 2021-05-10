import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})
export class Dialog2Component implements OnInit {

  public userid = ''
  public auth = ''
  public title = ''
  public describe = ''
  public amount = ''
  public typeForm: FormGroup;
  public thrifttypes = ['Choose thrift type', 'Daily', 'Weekly', 'Monthly'];
  public duration : any;
  public members: any;
  public thrift = {};
  public load = false
  public dis = false
  public suc = false
  public suc1 = false

  constructor(public fb: FormBuilder, public http: HttpClient,) { }

  createThrift() {
    let typedetails = this.typeForm.value;
let type = typedetails.typeControl;
if (this.title && this.describe && this.amount && this.duration && type) {
  this.members = this.duration - 1;
  this.thrift = {userid:this.userid, title: this.title, describe:this.describe, amount:this.amount, duration:this.duration, type:type, member:this.members}
  console.log(this.thrift)

  this.http.post<any>('http://localhost:80/ajo/ajobackend/creategroup.php', JSON.stringify(this.thrift)).subscribe(res=>{
      
      console.log(res)

      this.load = true
      this.dis = true
      setTimeout(() => {
        this.dis = false
        this.load = false
        this.suc = true
        
      }, 2000);
    
      setTimeout(() => {
        this.suc = false
      },1000);
      
      },
      err=>{console.log(err)
      
        this.suc1 = true

        setTimeout(() => {
          this.suc1 = false
        }, 2000);
      }
      )

}

    
  } 

  ngOnInit(): void {
    this.typeForm= this.fb.group({
      typeControl: ['Choose thrift type']
      });

    this.auth = localStorage.token
let auth = JSON.parse(atob(this.auth.split('.')[1]));
this.userid = auth.user;
console.log(this.userid)
  }
  

}
