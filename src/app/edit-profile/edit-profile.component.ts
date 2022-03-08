import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form = new FormGroup({
    firstname: new FormControl('', [
      Validators.minLength(4)
    ]),
    lastname: new FormControl('', [
      Validators.minLength(4)
    ]),
    image: new FormControl('', []),
    password: new FormControl('', [
      Validators.minLength(8)
    ]),
    username: new FormControl('', [
      Validators.minLength(8)
    ]),
    oldEmail: new FormControl('', [
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    email: new FormControl('', [
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    biography: new FormControl('', []),
    city: new FormControl('', []),
  })
  public image: any;
  public logged_user: any;
  public isVisible = true;
  public isShown = false;
  constructor(private authService: AuthenticationService) { }


  ngOnInit(): void {
    this.logged_user = JSON.parse(localStorage.getItem("logged_user"));
  }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  public toggleShow() {
    this.isShown = !this.isShown;
  }
  onSubmit() {
    //fixing email error
    this.form.value.oldEmail = this.logged_user.email;
    // fix values of empty inputs 
    if(this.form.value.firstname.length == 0) this.form.value.firstname = this.logged_user.firstname
    if(this.form.value.lastname.length == 0) this.form.value.lastname = this.logged_user.lastname
    if(this.form.value.username.length == 0) this.form.value.username = this.logged_user.username
    if(this.form.value.biography.length == 0) this.form.value.biography = this.logged_user.biography
    if(this.form.value.email.length == 0) this.form.value.email = this.logged_user.email
    if(this.form.value.image.length != 0) {
      console.log("image not empty");
      this.form.value.image = localStorage.newProfileImage;
      localStorage.removeItem('newProfileImage');
    }
    else
      this.form.value.image = this.logged_user.img; 
    
    console.log(this.form.value);
    this.authService.update(this.form.value)
      .subscribe(x =>
        console.log("hello")
      );
  }
  public extractImage() {
    // convert image from a file to stream and open a stream reader.
    let object = this;
    var file = (<HTMLInputElement>document.querySelector('#profile_image')).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      localStorage.newProfileImage = reader.result;
    };
    
  }

}
