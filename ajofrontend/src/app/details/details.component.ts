import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog3Component } from '../dialog3/dialog3.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public ajopost = [];
public auth = '';
public userId = '';
public ajoId = ''
public notice = false;
public noOfinvites = false;
public noOfFriends = null
public email = '';
public Invitenotify = '';
public processing = false;
public invites = [];
// public acceptedInvites = [];

// public baseUrl = environment.baseUrl;
public myInvites = [];
public acceptedInvites = [];

  constructor(public http: HttpClient, public actRoute: ActivatedRoute, public dialog: MatDialog) { }

  SendInvite() {
    if (this.email == '') {
      return
    } else {
    let det = { email: this.email, userid: this.userId, ajoid:this.ajoId}

    console.log(det)

    this.http.post<any>('http://localhost/ajo/ajobackend/invite.php', (det)).subscribe(
      data => {
      
      // this.image = data.image
      // this.firstname = data.firstname
      // this.amount = data.amount
      // this.ajopost = data.Ajopost;
      console.log(data)
      
      
      })
    
   
    }

  }

  displaymodal(){
    const dialogRef = this.dialog.open(Dialog3Component);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });      
 }


 payuser(userId){

  let det = {userid: userId, ajoid: this.ajoId }
  this.http.post<any>('http://localhost/ajo/ajobackend/payuser.php', (det)).subscribe(
    data => {
    
    // 
    console.log(data)
    
    
    })
 }


 pay(userId){

  let det = {userid: userId, ajoid: this.ajoId }

  this.http.post<any>('http://localhost/ajo/ajobackend/pay.php', (det)).subscribe(
    data => {
    
    // 
    console.log(data)
    
    
    })

 }



 start(){

  this.http.post<any>('http://localhost/ajo/ajobackend/start.php', (this.ajoId)).subscribe(
    data => {
    
    // 
    console.log(data)
    
    
    })

 }


  

  ngOnInit(): void {
    this.auth = localStorage.token
let auth = JSON.parse(atob(this.auth.split('.')[1]));
this.userId = auth.user;
console.log(this.userId)

this.http.post<any>('http://localhost/ajo/ajobackend/getpost.php', (this.userId)).subscribe(
      data => {
      
      // this.image = data.image
      // this.firstname = data.firstname
      // this.amount = data.amount
      this.ajopost = data.Ajopost;
      console.log(this.ajopost)
      
      
      })

      this.actRoute.params.subscribe(param => {
        this.ajoId = param.id;
        console.log(this.ajoId)
        })


        this.http.post<any>('http://localhost/ajo/ajobackend/getinvites.php', (this.userId)).subscribe(
      data => {
      
      
        this.invites = data.Allinvites;
        console.log(this.invites)
      
      })


      this.http.post<any>('http://localhost/ajo/ajobackend/getaccepted.php', (this.ajoId)).subscribe(
      data => {
      
      
        // this.invites = data.Allinvites;
        this.acceptedInvites = data.Getaccepted
        console.log(data.Getaccepted)
      
      })
  }
  

  

}
