import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public logged_user: any;
  public is_logged = false;
  constructor(public router : Router) { 
    console.log(this.router.url)
  }

  ngOnInit(): void {
    this.logged_user = JSON.parse(localStorage.getItem("logged_user"));
    this.is_logged = JSON.parse(localStorage.getItem("is_logged"));
  }
  public logout(){
    localStorage.clear();
    this.is_logged = false;
    this.router.navigateByUrl('/login');
  }

}
