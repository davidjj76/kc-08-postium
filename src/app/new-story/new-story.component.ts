import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { Post } from './../post';
import { PostService } from './../post.service';

@Component({
  selector: 'new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent implements OnInit, OnDestroy {

  private _postSubscription: Subscription;
  post: Post;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: { post: Post }) => this.post = data.post);
  }

  ngOnDestroy(): void {
    this._unsubscribePostSaved();
  }

  createPost(post: Post): void {
    this._unsubscribePostSaved();
    this._postSubscription = this._postService
                                 .createPost(post)
                                 .subscribe(() => this._router.navigate(['/']));
  }

  editPost(post: Post):void {
    this._unsubscribePostSaved();
    this._postSubscription = this._postService
                                 .editPost(post)
                                 .subscribe(() => this._router.navigate(['/']));    
  }

  private _unsubscribePostSaved(): void {
    if (this._postSubscription) {
      this._postSubscription.unsubscribe();
    }
  }

}
