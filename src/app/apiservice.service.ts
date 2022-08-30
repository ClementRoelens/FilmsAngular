import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const Url = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  public Url = Url;

  constructor(private http: HttpClient) { }

  getFilms(type: string = "film/getRandomFilms", paramUrl: string = "") {
    return this.http.get(Url + type + paramUrl);
  }

  getOneFilm(id: string) {
    return this.http.get(Url + "film/getOneFilm/" + id);
  }

  getOpinion(id: string) {
    return this.http.get(Url + "opinion/getOneOpinion/" + id);
  }

  signin(nicknameP: string, passwordP: string) {
    let credentials = {
      nickname: nicknameP,
      password: passwordP
    };
    return this.http.post(Url + "user/signin", credentials, { observe: "response" });
  }
}
