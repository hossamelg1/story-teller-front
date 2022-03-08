import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { forEachChild } from 'typescript';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: any;
  public separatePosts: any;
  constructor(private auth: AuthenticationService, private router: Router, private postService: PostService) {

  }

  ngOnInit(): void {
    this.postService.feedPage().subscribe(
      (data) => {
        this.posts = data;
        for(let i = 0; i< this.posts.length; i++) {
          this.posts[i].lines = this.posts[i].lines.filter(x => !x.content.includes('img'))
        }
      });
  }

  //for staory page
  public getStory(id) {
    console.log(id)
  }


}
