import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

    public title: any;
    public storyId: any;
    public story: any;
    public logged_user = JSON.parse(localStorage.logged_user ?? "{}");

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
        this.postService = postService;
        this.activatedRoute.params.subscribe(params => {
            if (typeof params['storyId'] !== 'undefined') {
                this.storyId = params['storyId'];
                console.log(this.storyId);
            } else {
                this.storyId = '';
            }
        });
    }
    
    ngOnInit(): void {
        if(this.storyId !== "undefined") {
            this.postService.getStory(this.storyId).subscribe(data => {
                console.log(data);
                this.story = data;
            },
            
            error =>  {
                console.log(error);
            });
        }
    }
}