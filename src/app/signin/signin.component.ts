import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: APIService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nickname: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  signin() {
    if (this.userForm.valid){
      this.service.signin(this.userForm.value.nickname, this.userForm.value.password).subscribe(
        user => {
        // Si l'utilisateur est correctement identifié, on met son ID en localStorage. 
        localStorage.setItem("id", user._id);
        // Celui-ci sera récupéré dans le OnInit du composant Home qui se chargera de récupérer les autres infos de l'utilisateur
        this.route.navigateByUrl("home");
      },
      error =>{
        console.log(error);
        alert(error.error);
      });
    }
    else {
      alert("Les champs doivent être remplis");
    }
  }
}
