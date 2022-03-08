import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private Http: HttpClient) { }
  private baseURL ="http://127.0.0.1:5000/";
  //
  public getUsers(){
    return this.Http.get(this.baseURL + 'getUsers');
  }
  public deleteUser(id){
    return this.Http.post(this.baseURL + 'deleteUser', id);
  }
}
