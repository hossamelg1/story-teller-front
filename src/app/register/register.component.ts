import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formErrors = new Object();
  //validators
  constructor(private authService: AuthenticationService, private router : Router) { }
  form = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
  })

  //shortcuts for Html froms
  get username(){ return this.form.get('username'); }
  get firstname(){ return this.form.get('firstname'); }
  get lastname(){ return this.form.get('lastname'); }
  get email(){ return this.form.get('email'); }
  get password(){ return this.form.get('password'); }
  ngOnInit(): void {}


  // send data to backend
  onSubmit(){
    this.authService.Register(this.form.value)
    .subscribe(x => {
      this.router.navigate(['/login']);
      if(x['errors']['email'] != undefined) 
        this.formErrors['email'] = x['errors']['email'];
      
      else if(x['errors']['username'])
        this.formErrors['username'] = x['errors']['username']; 
    });
  }
}
