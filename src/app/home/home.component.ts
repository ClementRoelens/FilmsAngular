import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../api.service';
import { Film } from '../models/Film';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // La plupart de ces attributs seront transmis aux composants enfants qui les utiliseront plus profondément
  selectedFilm: Film;
  transmittedFilms: Film[];
  user: User;
  seekedGenre: string;
  filmGenres: string[];
  isLogged: boolean = false;
  token: string;
  // Au chargement de la page, on utilisera ce paramètre de route pour afficher un film et un avis spécifique si nécessaire
  idToSeek: string = this.route.snapshot.params["filmId"];
  seekId: boolean = true;

  constructor(
    private service: APIService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.service.getFilms().subscribe((films: Film[]) => {
      // Si une id est passée dans la route, cette fonction affichera ce film. Sinon elle en prendra un au hasard dans la liste récupérée
      this.receiveFilms(films);
    });
    // Ensuite on va vérifier si l'utilisateur est authentifié
    this.token = localStorage.getItem('jwt');
    try {
      if (this.token && (this.token != "undefined")) {
        // Puisque l'utilisateur est authentifié, on affiche toutes ses infos
        this.service.getOneUser(localStorage.getItem("id")).subscribe((user: User) => {
          this.user = user;
          this.isLogged = true;
        });
        this.service.token = this.token;
      };
    }
    catch (error) {
      console.log(error);
    }
  }

  seekFilm(id: string) {
    this.service.getOneFilm(id).subscribe((film: Film) => {
      this.selectedFilm = film;
      this.filmGenres = this.selectedFilm.genres;
    });
  }

  seekGenre(genre: string) {
    this.service.getFilms("film/getRandomInOneGenre/", genre).subscribe((films: Film[]) => {
      this.receiveFilms(films);
    });
  }

  seekDirector(director: string) {
    this.service.getFilms("film/getRandomInOneDirector/", director).subscribe((films: Film[]) => {
      this.receiveFilms(films);
    })
  }

  receiveFilms(films: Film[]) {
    // Cette fonction met à jour la liste des films et en choisit un à afficher au centre
    this.transmittedFilms = films;
    if (this.idToSeek && this.seekId) {
      this.service.getOneFilm(this.idToSeek).subscribe(
        (film: Film) => {
          this.selectedFilm = film;
          this.filmGenres = this.selectedFilm.genres;
        },
        () => {
          this.getRandomFilm(films);
        });
        // La fonction receiveFilms sera appelée en cas de recherche de nouveaux films d'un genre ou d'un réalisateur particulier
        // On ne veut rechercher l'id passé en route qu'à l'initialisation, donc ce booléen repasse à false et ne changera plus de valeur
      this.seekId = false;
    }
    else {
      this.getRandomFilm(films);
    }
  }

  getRandomFilm(films: Film[]) {
    const rand = Math.round(Math.random() * (films.length - 1));
    this.selectedFilm = films[rand];
    this.filmGenres = this.selectedFilm.genres;
  }

  signout() {
    localStorage.removeItem("id");
    localStorage.removeItem("jwt");
    this.user = null;
    this.router.navigateByUrl("home");
    window.location.reload();
  }
}
