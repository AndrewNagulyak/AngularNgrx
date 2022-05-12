import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileShortInfoComponent } from './components/profile-short-info/profile-short-info.component';
import { StartPostComponent } from './components/start-post/start-post.component';
import { PostsComponent } from './posts.component';
import {IonicModule} from '@ionic/angular';
import {PostsRoutingModule} from './posts-routing.module';
import { CreatePostModalComponent } from './components/create-post-modal/create-post-modal.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import {FormsModule} from '@angular/forms';
import { UserInfoComponent } from './components/user-info/user-info.component';



@NgModule({
  declarations: [
    ProfileShortInfoComponent,
    StartPostComponent,
    PostsComponent,
    CreatePostModalComponent,
    AllPostsComponent,
    UserInfoComponent
  ],
  imports: [
    PostsRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class PostsModule { }
