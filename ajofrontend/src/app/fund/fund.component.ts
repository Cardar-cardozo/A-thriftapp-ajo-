import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  public auth = '';
public userId = '';
public notify = '';
public amount = '';
// public baseUrl = environment.baseUrl;
public fundadded = '';
public processing = false;
public note = '';
public suc = true

  constructor(public http: HttpClient, public dialog: MatDialog) { }

  fundwallet(){
    if (this.amount == '') {
      console.log('empty');
    }
     else {
      console.log(this.amount);
      let mon = {user:this.userId, amount:this.amount}
      console.log(mon)

      this.http.post<any>('http://localhost:80/ajo/ajobackend/fundwallet.php', JSON.stringify(mon)).subscribe(res=>{
      
      console.log(res)
      
      },
      err=>{console.log(err)}
      )
    }
  }

  ngOnInit(): void {

    this.auth = localStorage.token
let auth = JSON.parse(atob(this.auth.split('.')[1]));
this.userId = auth.user;

  setTimeout(() => {
      this.suc = false
    }, 2000);
  }
   

displaymodal(){
  const dialogRef = this.dialog.open(DialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });      
  }

}
