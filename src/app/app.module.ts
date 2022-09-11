import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { GenresListComponent } from './genres-list/genres-list.component';
import { HeaderComponent } from './header/header.component';
import { OpinionComponent } from './opinion/opinion.component';
import { FilmComponent } from './film/film.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './interceptors';
import { NewOpinionComponent } from './new-opinion/new-opinion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmsListComponent,
    GenresListComponent,
    HeaderComponent,
    OpinionComponent,
    FilmComponent,
    SigninComponent,
    SignupComponent,
    NewOpinionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
