import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NativeWindow } from './../window';
import { Post } from './../post';
import { User } from './../user';

@Component({
  templateUrl: './posts-by-author.component.html',
  styleUrls: ['./posts-by-author.component.css']
})
export class PostsByAuthorComponent implements OnInit {

  posts: Post[];
  author: User;

  constructor(
    private _activatedRoute: ActivatedRoute,
    @Inject(NativeWindow) private _window) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: { posts: Post[] }) => {
      this.posts = data.posts;
      if (data.posts.length) {
        this.author = data.posts[0].author;
      }
    });
    this._window.scrollTo(0, 0);
  }

}
