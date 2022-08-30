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
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
