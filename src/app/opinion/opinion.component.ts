import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Opinion } from '../models/Opinion';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  @Input() opinion: Opinion;
  @Input() author:string;
  @Output() opinionIndexChange = new EventEmitter<number>();
  @Input() isLogged:boolean;
  @Input() isLiked:boolean;
  likedOpinionIcon: string;
  @Output() opinionLiked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // À chaque changement, on vérifie que l'avis affiché est liké par l'utilisateur ou non pour mettre à jour l'icône
    this.likedOpinionIcon = this.isLiked ? "./assets/full_heart.png" : "./assets/empty_heart.png";
  }

  opinionSelection(selection: number) {
    // Fonction gérée par le composant parent Film, car on n'a pas transmis l'utilisateur jusqu'ici
    this.opinionIndexChange.emit(selection);
  }

  likeOpinion() {
    if (this.isLogged){
      this.opinionLiked.emit(this.opinion._id);
    }
    else{
      alert("Connectez-vous pour effectuer cette action");
    }
  }
}
