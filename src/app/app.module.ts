import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { NewStoryComponent } from './new-story/new-story.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccSettingsComponent } from './acc-settings/acc-settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { StoryComponent } from './story/story.component';
import { AdminSComponent } from './admin-s/admin-s.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    LoginComponent,
    LoginComponent,
    RegisterComponent,
    NewStoryComponent,
    NavbarComponent,
    AccSettingsComponent,
    EditProfileComponent,
    StoryComponent,
    AdminSComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

