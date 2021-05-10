import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  public auth = '';
  public image = ''
  public baseurl = 'http://localhost/ajo/ajobackend/uploads/';
  public firstname = '';
  public lastname = '';
  public amount = '';
  public suc1 = false

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public http: HttpClient,public router:Router) {}

  account(){
    this.router.navigate(['/mainnav'])
  }

  wallet(){
    this.router.navigate(['/mainnav/fundwallet'])
  }

  invite(){
    this.router.navigate(['/mainnav/invite'])
  }

  group(){
    this.router.navigate(['/mainnav/creategroup'])
  }

  ngOnInit(): void {
    this.auth = localStorage.token
    this.http.post<any>('http://localhost/ajo/ajobackend/profiledetails.php', (this.auth)).subscribe(
      data => {
      
      this.image = data.image
      this.firstname = data.firstname
      this.lastname = data.lastname
      this.amount = data.amount
      console.log(data)
      
      
      },
      
      
      err=>{console.log(err)
      

        alert('cant connect to the database on your data')
      }
      )
  }

}
