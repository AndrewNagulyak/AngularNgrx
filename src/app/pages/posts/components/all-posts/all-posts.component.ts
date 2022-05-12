import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {take} from 'rxjs';
import {Post} from '../../../../shared/models/post.model';
import {CreatePostModalComponent} from '../create-post-modal/create-post-modal.component';
import {PostService} from '../../../../core/api/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() postBody?: string;


  queryParams: string;
  allLoadedPosts: Post[] = [];
  numberOfPosts = 5;
  skipPosts = 0;


  constructor(
    private postService: PostService,
    public modalController: ModalController
  ) {}

  ngOnInit() {

    this.getPosts(false, '');
  }

  ngOnChanges(changes: SimpleChanges) {
    const postBody = changes.postBody.currentValue;
    if (!postBody) return;

    this.postService.createPost(postBody).subscribe((post: Post) => {

    });
  }

  getPosts(isInitialLoad: boolean, event) {
    if (this.skipPosts === 20) {
      event.target.disabled = true;
    }
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;

    this.postService
      .getSelectedPosts(this.queryParams)
      .subscribe((posts: Post[]) => {
        for (let postIndex = 0; postIndex < posts.length; postIndex++) {
          // const doesAuthorHaveImage = !!posts[postIndex].author.imagePath;
          // let fullImagePath = this.authService.getDefaultFullImagePath();
          // if (doesAuthorHaveImage) {
          //   fullImagePath = this.authService.getFullImagePath(
          //     posts[postIndex].author.imagePath
          //   );
          // }
          // posts[postIndex]['fullImagePath'] = fullImagePath;
          this.allLoadedPosts.push(posts[postIndex]);
        }
        if (isInitialLoad) event.target.complete();
        this.skipPosts = this.skipPosts + 5;
      });
  }

  loadData(event) {
    this.getPosts(true, event);
  }

  async presentUpdateModal(postId: number) {
    console.log('EDIT POST');
    const modal = await this.modalController.create({
      component: CreatePostModalComponent,
      cssClass: 'my-custom-class2',
      componentProps: {
        postId,
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (!data) return;

    const newPostBody = data.post.body;
    this.postService.updatePost(postId, newPostBody).subscribe(() => {
      const postIndex = this.allLoadedPosts.findIndex(
        (post: Post) => post.id === postId
      );
      this.allLoadedPosts[postIndex].body = newPostBody;
    });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.allLoadedPosts = this.allLoadedPosts.filter(
        (post: Post) => post.id !== postId
      );
    });
  }

  ngOnDestroy() {
  }
}
