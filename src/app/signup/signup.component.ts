import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private service: APIService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      // On n'a pas exigé les contraintes habituelles pour le password, on demande juste que les champs ne soient pas vides
      nickname: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  signup() {
    if (this.userForm.valid) {
      this.service.signup(this.userForm.value.nickname, this.userForm.value.password).subscribe(res => {
        alert(res.message);
        this.router.navigateByUrl("home");
      })
    }
    else {
      alert("Tous les champs doivent être remplis")
    }
  }
}
