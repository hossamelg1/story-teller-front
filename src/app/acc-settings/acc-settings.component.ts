import { Component, OnInit } from '@angular/core';
import { PostService } from './../post.service';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  styleUrls: ['./acc-settings.component.css']
})
export class AccSettingsComponent implements OnInit {
  public logged_user: any;

  constructor(public auth: AuthenticationService, private router: Router, private postService: PostService) { 
    if (!this.auth.user.username) {
      this.router.navigate(['/login']);
    }
  }
  public posts: any;
  ngOnInit(): void {
    this.logged_user = JSON.parse(localStorage.getItem("logged_user"));
    console.log(this.logged_user.id)
    this.postService.myStories(this.logged_user.id).subscribe(
      (data) => {
        this.posts = data;
        console.log(this.posts)
      });
  }
  public deleteStory(id) {
    if (confirm("Are you sure to delete ",)) {
      window.location.reload();
      this.postService.deleteStory(id).subscribe(x => {
        console.log(x);
      })
    }
  }
}