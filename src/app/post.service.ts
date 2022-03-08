import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private Http: HttpClient) { }
  private baseURL = "http://127.0.0.1:5000/";

  public insertPost(data: any) {
    let payload = data;
    return this.Http.post(this.baseURL + 'insertPost', payload);
  }
  public feedPage() {
    return this.Http.get(this.baseURL + 'feedPage');
  }

  public getStory(id: any) {
    return this.Http.get(this.baseURL + "story?storyId=" + id);
  }
  public myStories(id:any){
    return this.Http.get(this.baseURL +'myStories');
  }
  public deleteStory(id: any){
    return this.Http.post(this.baseURL + 'deleteStory', id);
  }
}