import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { APIService } from "../api.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service:APIService){}

    intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        const headers = new HttpHeaders()
        .append('Authorization', `Bearer ${this.service.token}`);
      const modifiedReq = req.clone({ headers });
      return next.handle(modifiedReq);
    }
}