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
  @Input() activeGenres:string[];
  @Output() seekedGenre = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

  getFilms(genre:string){
    this.seekedGenre.emit(genre);
  }
}
