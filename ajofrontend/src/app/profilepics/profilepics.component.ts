import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profilepics',
  templateUrl: './profilepics.component.html',
  styleUrls: ['./profilepics.component.css']
})
export class ProfilepicsComponent implements OnInit {

  
  public auth = '';
  public firstname = ''
  public lastname = ''
  public middlename = ''
  public phone = ''
  public dob = ""
  public email = ''
  public gender = ''
  public image = ''
  public selectedFile: File
  public status = ""
  // public baseUrl = environment.baseUrl;
  public baseurl = 'http://localhost/ajo/ajobackend/uploads/';
  public uploadInfo = '';
  
  
  

  onFileChanged(e) {
    this.selectedFile = e.target.files[0];
    this.uploadInfo = 'File Chosen, click upload'
    }
    uploadFile() {
    let auth = JSON.parse(atob(this.auth.split('.')[1]))
    let userId = auth.user;
    let upload = new FormData();
    upload.append('myFile', this.selectedFile, this.selectedFile.name);
    this.http.post<any>('http://localhost/ajo/ajobackend/upload.php', upload,{
    headers: {
    'Authorization':  userId
    }
    }).subscribe(
    data => {
    if(data.Upload) {
    this.status = 'good'
    } else if (data.Notuploaded) {
    this.status = 'bad'
    } else if (data.Large) {
    this.status = 'large'
    }
    }
    )
    
    
    }
  
  // fileChange(e){
    //     this.file = e.target.files[0]
    // }
    
    constructor(public http: HttpClient) { }
  
  ngOnInit(): void {
    
    this.auth = localStorage.token
    this.http.post<any>('http://localhost/ajo/ajobackend/profiledetails.php', (this.auth)).subscribe(
      data => {
      
      this.image = data.image
      console.log(data)
      
      
      })
    // this.image = data.Profilepic
  }

  

}
