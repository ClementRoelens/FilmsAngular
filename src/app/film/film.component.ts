import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Film } from '../models/Film';
import { Opinion } from '../models/Opinion';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  @Input() film: Film;
  @Input() isLogged:boolean;
  @Output() seekedDirector = new EventEmitter<string>();
  likedIcon: string = "./assets/thumbup.png";
  dislikedIcon: string = "./assets/thumbdown.png";
  opinions: Opinion[];
  opinionIndex: number = 0;
  selectedOpinion:Opinion = null;

  constructor(private service: APIServiceService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.film.opinionsId.length > 0){
      console.log("filmComponent : opinions exprimées sur ce film");
      this.getOpinions();
    }
    else {
      this.opinions = null;
      this.selectedOpinion = null;
    }
  }

  like() {
    if (this.isLogged){

    }
    else{
      alert("Connectez-vous pour effectuer cette action");
    }
  }

  dislike() {
    if (this.isLogged){

    }
    else{
      alert("Connectez-vous pour effectuer cette action");
    }
  }

  addOpinion() {
    if (this.isLogged){

    }
    else{
      alert("Connectez-vous pour effectuer cette action");
    }
  }

  getFilms(director: string) {
    this.seekedDirector.emit(director);
  }

  getOpinions() {
    this.opinions = [];
    this.opinionIndex = 0;
    let i = 0;
    this.film.opinionsId.forEach(opinionId => {
      this.service.getOpinion(opinionId).subscribe((opinion: Opinion) => {
        this.opinions.push(opinion);
        i++;
        if (this.film.opinionsId.length > 1 && i == this.film.opinionsId.length) {
          this.opinions.sort((a, b) => {
            return a.likes - b.likes;
          });
         
        }
        if (i == this.film.opinionsId.length){
          this.selectedOpinion = this.opinions[0];
        }
      });
    });
  }

  opinionSelection(selection:number){
    console.log("filmComponent : opinionSelection reçu");
    let result = this.opinionIndex + selection;
    if (result >= 0 && result < this.film.opinionsId.length){
      console.log("changement d'avis en cours");
      this.opinionIndex = result;
      this.selectedOpinion = this.opinions[this.opinionIndex];
    }   
  }
}
