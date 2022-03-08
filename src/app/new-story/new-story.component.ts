import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PostService } from '../post.service';

@Component({
  selector: 'new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent implements OnInit {
  // variables declaration
  public delHFix = true;
  public delTFix = true;
  public newTitle: any;
  public header: any;
  public h: any;
  public article: any;
  public placeholder: any;
  public title: any;
  public idLine: any;
  public id: any;
  public logged_user: any;
  public is_logged: any;
  public addClicked = false;
  public backgroundImage = undefined;

  public newParagraph(idParagraph, article) {
    var p = document.createElement('p');
    p.setAttribute('contenteditable', 'true');
    this.id++
    p.id = idParagraph.toString();
    var addMedia = document.getElementById("add-media");
    article.insertBefore(p, addMedia);
  };
  // function newParagraph(): any;
  constructor(private auth: AuthenticationService, private router: Router, private post_service: PostService) {
    if (!this.auth.user.username || this.auth.user.isAdmin) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    console.log('im in ')
    this.logged_user = JSON.parse(localStorage.getItem("logged_user"));
    this.is_logged = JSON.parse(localStorage.getItem("is_logged"));

    console.log(this.logged_user);
    console.log(this.is_logged);
    var line = {
      id: '',
      content: ''
    };
    this.h = document.createElement('h4');
    this.header = document.getElementsByClassName('header')[0];
    this.title = document.getElementById('title')
    this.article = document.getElementsByClassName('article')[0];
    this.idLine = 0;
    this.id = 0;
    this.placeholder = document.getElementsByClassName('placeholder')[0];
    var newP = document.getElementById('addP')
    // functions 
    this.logged_user
    function para() {
      console.log("hello")
    }
    // this.placeholder.addEventListener('click', function() {
    //   this.newParagraph(this.id, this.article);
    //   this.article.removeChild(this.placeholder);
    //   console.log(this.id, this.idLine);
    // });
  }
  public keyOut2() {
    if (this.placeholder.innerText.length === 0) {
      this.placeholder.innerText = "Tell a story..."
      this.placeholder.style.color = 'grey';
    }
  }
  public titleCliked() {
    if (this.title.innerText == "Title") {
      this.title.innerText = ""
      this.title.setAttribute('contenteditable', 'true');
      this.title.focus();
    }
  };
  public stopEnter() {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  public spanClicked() {
    if (this.placeholder.innerText == "Tell a story...") {
      console.log("fire")
      this.placeholder.innerText = "";
      this.placeholder.setAttribute('contenteditable', 'true');
      this.placeholder.focus();
      this.placeholder.style.color = 'black';
    }

    // this.newParagraph(this.id, this.article);
    // this.article.removeChild(this.placeholder);
    // console.log(this.id, this.idLine);
  };
  public enterClicked(event) {
    this.idLine++
    console.log(this.idLine)
    if (this.idLine === 10) {
      this.idLine = 1
      this.newParagraph(this.id, this.article)
    }
  }

  public getResult() {
    // let object = this;
    // var file = (<HTMLInputElement>document.querySelector('#backgroundImage')).files[0];
    // var reader = new FileReader();
    // reader.readAsDataURL(file);

    // //add onload event and put the image loaded in the html.
    // reader.onload = function () {
    //   object.backgroundImage = reader.result;
    // };
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
    var post = {};
    var output = [];
    var paragraphs = this.article.getElementsByTagName('p');
    var linecount = 0;
    // const regex1 = ;
    // const regex2 = /<\/div?*>/g;
    for (var i = 0; i < paragraphs.length; i++) {
      // var paragraph = .innerHTML.replace('<(div|h1).*?</\1>', '\n');
      var lines = paragraphs[i]
        .innerHTML
        .replaceAll(/(<div*>)/g, '\n')
        .replaceAll("</div>", '\n')
        .replaceAll("<br>", '\n')
        .split('\n')
        .filter(x => x !== "");

      console.log(lines);
      for (var j = 0; j < lines.length; j++) {
        output.push({ content: lines[j], id: linecount++ });
      }
    }
    setTimeout(() => {
      post = { title: this.title.innerHTML, lines: output, backgroundImg: this.backgroundImage };
      console.log("###############")
      console.log('hello')
      console.log(post);
      this.post_service.insertPost(post).subscribe(x => {
        alert("your story was posted successfully!");
        window.location.href='/';
      });
    }, 2000);
    console.log("this is the post sending")
  };

  public keyOut() {
    if (this.title.innerText.length === 0) {
      this.title.innerText = "Title"
    }
  }

  public toggleAdd() {
    this.addClicked = !this.addClicked;
  }

  public extractImage() {
    // convert image from a file to stream and open a stream reader.
    let object = this;
    var file = (<HTMLInputElement>document.querySelector('#image')).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    //add onload event and put the image loaded in the html.
    reader.onload = function () {
      var lastparagraph = document.getElementsByClassName("placeholder")[document.getElementsByClassName("placeholder").length - 1]
      lastparagraph.innerHTML += "<img width='500' src='" + reader.result + "'/>\n";
      object.idLine++;
      console.log(object.idLine);
      // object.newParagraph(object.id, object.article)
      object.addClicked = false;
      if (object.backgroundImage === undefined) {
        object.backgroundImage = reader.result;
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
