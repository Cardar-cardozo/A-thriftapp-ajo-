import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public amounts = "";
  public amount = true;
  public auth = ''
  public userId = ''
  public load = false
  public suc1 = false
 
  public suc = false
  constructor(public http: HttpClient,) { 
  }

  fundwallet(){
    console.log(this.amounts);
      let mon = {user:this.userId, amount:this.amounts}
      console.log(mon)

    

      this.http.post<any>('http://localhost:80/ajo/ajobackend/fundwallet.php', JSON.stringify(mon)).subscribe(res=>{
      
      console.log(res)

      this.load = true
      this.amount = true
      
      setTimeout(() => {
       
        this.load = false
        this.amount = false
        this.suc = true
        
      }, 2000);
    
      setTimeout(() => {
        this.suc = false
      },3000);
      
      }, 
      err=>{console.log(err)
        this.suc1 = true

        setTimeout(() => {
          this.suc1 = false
        }, 2000);
      }
      )
  }

  
  
  ngOnInit(): void {
    // if (this.amounts == "") {
    //      this.amount = true
    // } else{
    //   this.amount = false
    // }
    
  }

  checkvalue(val){
    if (!this.amounts || val.length < 4) {
      this.amount = true
    } else{
      this.amount = false
    }

    this.auth = localStorage.token
let auth = JSON.parse(atob(this.auth.split('.')[1]));
this.userId = auth.user;
  }

}
