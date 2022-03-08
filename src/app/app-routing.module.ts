import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccSettingsComponent } from './acc-settings/acc-settings.component';
import { AdminSComponent } from './admin-s/admin-s.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewStoryComponent } from './new-story/new-story.component';
import { RegisterComponent } from './register/register.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'admin', 
    component: AdminSComponent
  },
  {
    path: 'new-post',
    component: NewStoryComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'my-account',
    component: AccSettingsComponent
  },
  {
    path: 'edit-profile', 
    component: EditProfileComponent 
  },
  { path: 'story/:storyId', component: StoryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
