import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dialog3Component } from '../dialog3/dialog3.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  public suc = true
  public userId = '';
public auth = '';
public invites = [];

  constructor(public http: HttpClient, public dialog: MatDialog) { }

  displaymodal(ajo_id){
    const dialogRef = this.dialog.open(Dialog3Component);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });  
    
    localStorage.setItem('ajo', ajo_id)
    localStorage.setItem('userid', this.userId)
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.suc = false
    }, 2000);

    this.auth = localStorage.token
let auth = JSON.parse(atob(this.auth.split('.')[1]));
this.userId = auth.user;


this.http.post<any>('http://localhost/ajo/ajobackend/inviteget.php', (this.userId)).subscribe(
      data => {
      
      
        this.invites = data.Allinvites;
        console.log(this.invites)
      
      })
  }

}
