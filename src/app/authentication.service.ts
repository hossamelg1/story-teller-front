import { LoginComponent } from './login/login.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public user = JSON.parse(localStorage.logged_user ?? "{}");

  constructor(private Http: HttpClient) { }
  private baseURL = "http://127.0.0.1:5000/";

  //register function
  public Register(data: any) {
    let payload = data;
    return this.Http.post(this.baseURL + 'register', payload)
  }
  // login function
  public Login(data: any) {
    let payload = data;
    return this.Http.post(this.baseURL + 'login', payload);
  }
  public update(data: any) {
    let payload = data;
    return this.Http.post(this.baseURL + 'update', payload);
  }

}
