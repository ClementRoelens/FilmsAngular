import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {

  genres: string[] = [
    "Action",
    "Aventure",
    "Comédie",
    "Drame",
    "Fantasy",
    "Guerre",
    "Historique",
    "Horreur",
    "Romance",
    "Science-fiction",
    "Thriller",
    "Western"
  ];
  // Les gens actifs sont ceux qu'on peut attribuer au film sélectionné, film présent dans le composant parent
  @Input() activeGenres:string[];
  // En cliquant sur un genre, on active chez le parent la recherche de tous les films de ce genre
  @Output() seekedGenre = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getFilms(genre:string){
    this.seekedGenre.emit(genre);
  }
}
