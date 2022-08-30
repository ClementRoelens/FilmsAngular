import { Component, Input, Output, EventEmitter , OnInit } from '@angular/core';
import { Film } from '../models/Film';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  @Input() films:Film[];
  @Output() seekedFilmId = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getOneFilm(id:string){
    this.seekedFilmId.emit(id);
  }
}
