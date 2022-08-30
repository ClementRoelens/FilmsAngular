import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { emit } from 'process';
import { Opinion } from '../models/Opinion';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  @Input() opinion: Opinion;
  @Output() opinionIndexChange = new EventEmitter<number>();
  @Input() isLogged:boolean;
  likedOpinionIcon: string = "./assets/empty_heart.png";
  constructor() { }

  ngOnInit(): void {
    console.log("opinionComponent init");
  }

  ngOnChanges() {
    console.log("opinionComponent changes");
  }

  opinionSelection(selection: number) {
    console.log("opinionSelection lancé!");
    this.opinionIndexChange.emit(selection);
  }

  likeOpinion() {
    if (this.isLogged){

    }
    else{
      alert("Connectez-vous pour effectuer cette action");
    }
  }
}
