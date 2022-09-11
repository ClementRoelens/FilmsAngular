import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user:User;
  @Input() isLogged:boolean;
  @Output() signoutMessage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  signout(){
    this.signoutMessage.emit();
  }
}
