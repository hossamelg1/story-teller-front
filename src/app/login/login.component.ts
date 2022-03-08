import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public static logged_user: any;
  public loginErrors: any;
  public user: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  // form's validators
  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
  });
  ngOnInit(): void {
  }
  //form's shortcuts
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  // validation 
  onSubmit() {
    this.authService.Login(this.form.value).subscribe(
      (data) => {
        localStorage.setItem("logged_user", JSON.stringify(data));
        localStorage.setItem('is_logged', 'true')
        this.authService.user = this.user = JSON.parse(localStorage.getItem('logged_user'));
        console.log(this.user.firstname);
        if(this.user.isAdmin) {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/']);
        } 
      },
      error => {
        this.loginErrors = error.error;
      });
  }

}
