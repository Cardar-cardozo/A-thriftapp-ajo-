import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DetailsComponent } from './details/details.component';
import { FundComponent } from './fund/fund.component';
import { GroupComponent } from './group/group.component';
import { AppGuard } from './guard/app.guard';
import { HomeComponent } from './home/home.component';
import { InviteComponent } from './invite/invite.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PostajoComponent } from './postajo/postajo.component';
import { ProfilepicsComponent } from './profilepics/profilepics.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent },
  {path:'register', component: RegisterComponent },
  {path:'login', component: LoginComponent },
  {path:'profilepic',  component: ProfilepicsComponent } ,
  {path:'confirmemail', component: ConfirmemailComponent },
  {path:'mainnav', component: MainNavComponent,  canActivate:[AppGuard], children:[

    {path:'', component: HomeComponent },
    {path:'fundwallet', component: FundComponent },
    {path:'creategroup', component: GroupComponent },
    {path:'postgroup', component: PostajoComponent },
    {path:'details/:id', component: DetailsComponent },
    {path:'invite', component: InviteComponent },
  ] },


    // {path:'dashboard', canActivate:[AppGuard], component: DashbordComponent, children:[

    //   {path:'fundwallet', component: FundComponent },
    //   {path:'creategroup', component: GroupComponent },
    //   {path:'postgroup', component: PostajoComponent },
    //   {path:'details', component: DetailsComponent },
    //   {path:'invite', component: InviteComponent },
    // ] },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
