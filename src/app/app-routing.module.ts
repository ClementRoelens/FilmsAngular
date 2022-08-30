import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent},
  {path:"**",redirectTo:"home",pathMatch:"full"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
