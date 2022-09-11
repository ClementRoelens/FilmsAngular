import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewOpinionComponent } from './new-opinion/new-opinion.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"home/:filmId/:opinionId",component:HomeComponent},
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent},
  {path:"opinion/:filmId/:action",component:NewOpinionComponent},
  {path:"opinion/:filmId/:action/:opinionId",component:NewOpinionComponent},
  {path:"**",redirectTo:"home",pathMatch:"full"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
