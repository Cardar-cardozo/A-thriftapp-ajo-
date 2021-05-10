import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog3',
  templateUrl: './dialog3.component.html',
  styleUrls: ['./dialog3.component.css']
})
export class Dialog3Component implements OnInit {
  public auth = '';
public userId = '';
public ajoId = '';
public email = '';
public title = '';
public describ = '';
public type = '';
public amount = '';
public duration = '';
public c 
public ajomoney = ''
public user = '';
public time 


  constructor(public actRoute: ActivatedRoute, public http: HttpClient,) { }


  SendInvite() {
    // if (this.email == '') {
    //   return
    // } else {
    // let details = { email: this.email, userid: this.userId, ajoid:this.ajoId}

    // console.log(details)
    
   
    // }

  }

  reject(){
    let det = {ajoid: this.ajoId, inviteeid: this.user}
    this.http.post<any>('http://localhost/ajo/ajobackend/reject.php', (det)).subscribe(
      data => {

        console.log(data)
      
        
      })
  }

  accept(){
    if (this.ajomoney<this.amount) {
      console.log('not enough')
    } else {

      let det = {ajoid: this.ajoId, inviteeid: this.user, duration: this.duration}

      this.http.post<any>('http://localhost/ajo/ajobackend/accept.php', (det)).subscribe(
      data => {

        console.log(data)
      
        
      })

    }
  }

  ngOnInit(): void {
    this.auth = localStorage.token
let auth = JSON.parse(atob(this.auth.split('.')[1]));
this.userId = auth.user;

this.ajoId = localStorage.ajo
this.user = localStorage.userid

console.log(this.ajoId)
console.log(this.user)

this.http.post<any>('http://localhost/ajo/ajobackend/ajodet.php', (this.ajoId)).subscribe(
      data => {
      
        let ajodetails = data.Ajodetails;
        this.title = ajodetails.title
        this.describ = ajodetails.describ
        this.type = ajodetails.type
        this.amount = ajodetails.amount
        this.duration = ajodetails.duration
      console.log(ajodetails)

      let b = Number(this.amount) * 2 ;
      
        this.c = b

        let d = Number(this.duration)/2

        this.time = d
      })


      this.http.post<any>('http://localhost/ajo/ajobackend/profiledetails.php', (this.auth)).subscribe(
      data => {
      
      // this.image = data.image
      // this.firstname = data.firstname
      // this.lastname = data.lastname
      this.ajomoney = data.amount
      console.log(data)
      
      
      },
      
      
      err=>{console.log(err)
      

        alert('cant connect to the database on your data')
      }
      )


// this.actRoute.params.subscribe(params => {
//   this.ajoId = params.id;
  
//   console.log(this.ajoId)
// })

  }

}
