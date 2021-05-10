import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfilepicsComponent } from './profilepics/profilepics.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials.module';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { FundComponent } from './fund/fund.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GroupComponent } from './group/group.component';
import { PostajoComponent } from './postajo/postajo.component';
import { InviteComponent } from './invite/invite.component';
import { DetailsComponent } from './details/details.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { Dialog2Component } from './dialog2/dialog2.component';
import { LoaderComponent } from './loader/loader.component';
import { Dialog3Component } from './dialog3/dialog3.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfilepicsComponent,
    DashbordComponent,
    ConfirmemailComponent,
    FundComponent,
    LandingPageComponent,
    GroupComponent,
    PostajoComponent,
    InviteComponent,
    DetailsComponent,
    MainNavComponent,
    HomeComponent,
    DialogComponent,
    Dialog2Component,
    LoaderComponent,
    Dialog3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
