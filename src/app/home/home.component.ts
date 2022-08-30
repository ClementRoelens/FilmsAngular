import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Film } from '../models/Film';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFilm:Film;
  transmittedFilms:Film[]
  user:User;
  seekedGenre:string;
  filmGenres:string[];
  isLogged:boolean = false;
  token:string;

  constructor(private service:APIServiceService){
    
  }

  ngOnInit():void {
    this.service.getFilms().subscribe((films:Film[]) => {
      this.receiveFilms(films);
    });
    this.token = localStorage.getItem("jwt");
    try {
        if (this.token && (this.token != "undefined")) {
            // Puisque l'utilisateur est authentifié, on affiche toutes ses infos
            this.isLogged = true;
            this.user.userId = localStorage.getItem("id");
            this.user.nickname = localStorage.getItem("nickname");
            this.user.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
            this.user.likedFilmsId = JSON.parse(localStorage.getItem("likedFilmsId"));
            this.user.dislikedFilmsId = JSON.parse(localStorage.getItem("dislikedFilmsId"));
            this.user.opinionsId = JSON.parse(localStorage.getItem("opinionsId"));
            this.user.likedOpinionsId = JSON.parse(localStorage.getItem("likedOpinionsId"));
        };
    }
    catch (error) {
        console.log(error);
    }
  }

  seekFilm(id:string){
    this.service.getOneFilm(id).subscribe((film:Film) => {
      this.selectedFilm = film;
      this.filmGenres = this.selectedFilm.genres;
    });
  }

  seekGenre(genre:string){
    this.service.getFilms("film/getRandomInOneGenre/",genre).subscribe((films:Film[])=>{
      this.receiveFilms(films);
    });
  }

  seekDirector(director:string){
    this.service.getFilms("film/getRandomInOneDirector/"+this.selectedFilm.director).subscribe((films:Film[])=>{
      this.receiveFilms(films);
    })
  }

  receiveFilms(films:Film[]){
    this.transmittedFilms = films;
    const rand = Math.round(Math.random() * (films.length - 1));
    this.selectedFilm = films[rand];
    this.filmGenres = this.selectedFilm.genres;
  }
}
