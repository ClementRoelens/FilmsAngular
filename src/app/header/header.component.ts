import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User={
    userId:null,
    nickname:"visiteur",
    likedFilmsId:[""],
    dislikedFilmsId:[""],
    opinionsId:[""],
    likedOpinionsId:[""],
    isAdmin:false,
    token:null
  };
  isLogged:false;

  constructor() { }

  ngOnInit(): void {
  }

}
