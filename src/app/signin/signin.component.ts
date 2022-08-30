import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service:APIServiceService,
    private route:Router
    ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nickname:"",
      password:""
    });
  }

  signin(){
    this.service.signin(this.userForm.value.nickname,this.userForm.value.password).subscribe((res:any)=>{
      localStorage.setItem("id", res.userId);
      localStorage.setItem("nickname", res.nickname);
      localStorage.setItem("likedFilmsId", JSON.stringify(res.likedFilmsId));
      localStorage.setItem("opinionsId", JSON.stringify(res.opinionsId));
      localStorage.setItem("likedOpinionssId", JSON.stringify(res.likedOpinionsId));
      localStorage.setItem("dislikedFilmsId", JSON.stringify(res.dislikedFilmsId));
      localStorage.setItem("isAdmin", res.isAdmin);
      localStorage.setItem("jwt", res.token);
      this.route.navigate(["home"]);
    })
  }
}
