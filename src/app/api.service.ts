import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from './models/Film';
import { Opinion } from './models/Opinion';
import { User } from './models/User';
import { map, tap } from 'rxjs/operators';

const Url = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private Url: string = Url;
  public token: string = null;

  constructor(private http: HttpClient) { }

  signup(nicknameP: string, passwordP: string): Observable<any> {
    const body = {
      nickname: nicknameP,
      password: passwordP
    };
    return this.http.post<any>(Url + "user/signup", body);
  }

  signin(nicknameP: string, passwordP: string): Observable<User> {
    const credentials = {
      nickname: nicknameP,
      password: passwordP
    };
    return this.http.post<any>(Url + "user/signin", credentials).pipe(
      tap(res => {
        this.token = res.token;
        localStorage.setItem("jwt", res.token);
      }),
      map(user => {
        delete user.token;
        return user;
      })
    );
  }
  
  getOneUser(id: string): Observable<User> {
    return this.http.get<User>(Url + "user/getOneUser/" + id);
  }


  getFilms(type: string = "film/getRandomFilms", paramUrl: string = ""): Observable<Film[]> {
    return this.http.get<Film[]>(Url + type + paramUrl);
  }

  getOneFilm(id: string): Observable<Film> {
    return this.http.get<Film>(Url + "film/getOneFilm/" + id);
  }
 
  likeOrDislikeFilm(filmIdP: string, userIdP: string, actionP: string): Observable<{ user: User, film: Film }> {
    const body = {
      filmId: filmIdP,
      userId: userIdP,
      action: actionP
    };
    return this.http.put<{ user: User, film: Film }>(Url + "shared/likeOrDislikeFilm", body);
  }



  addOpinion(filmIdP: string, userIdP: string, contentP: string): Observable<{ user: User, film: Film, opinion: Opinion }> {
    const body = {
      filmId: filmIdP,
      userId: userIdP,
      content: contentP
    };
    return this.http.post<{ user: User, film: Film, opinion: Opinion }>(Url + "shared/addOneOpinion", body);
  }

  getOpinion(id: string): Observable<Opinion> {
    return this.http.get<Opinion>(Url + "opinion/getOneOpinion/" + id);
  }

  likeOpinion(userIdP: string, opinionIdP: string): Observable<{ user: User, opinion: Opinion }> {
    const body = {
      userId: userIdP,
      opinionId: opinionIdP
    };
    return this.http.put<{ user: User, opinion: Opinion }>(Url + "shared/likeOpinion", body);
  }

  editOpinion(opinionIdP: string, newContent: string): Observable<Opinion> {
    const body = { content: newContent };
    return this.http.put<Opinion>(Url + "opinion/editOpinion/" + opinionIdP, body);
  }

  eraseOpinion(opinionIdP: string, filmIdP: string, userIdP: string): Observable<{ user: User, film: Film }> {
    return this.http.delete<{ user: User, film: Film }>(Url + `shared/eraseOpinion/${opinionIdP}/${filmIdP}/${userIdP}`);
  }


}


