import { 
  Component, 
  Inject, 
  OnInit 
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { NativeWindow } from './../window';
import { Post } from './../post';
import { User } from './../user';
import { Category } from './../category';
import { PostService } from './../post.service';

@Component({
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post;
  // Fake user
  loggedUser: User = User.defaultUser();

  constructor(
    private _router: Router, 
    private _activatedRoute: ActivatedRoute,
    private _postService: PostService, 
    @Inject(NativeWindow) private _window) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: { post: Post }) => this.post = data.post);
    this._window.scrollTo(0, 0);
  }

  plainTextToHtml(text: string): string {
    return text ? `<p>${text.replace(/\n/gi, "</p><p>")}</p>` : '';
  }

  /*---------------------------------------------------------------------------------------------------------------|
   | ~~~ Red Path ~~~                                                                                              |
   |---------------------------------------------------------------------------------------------------------------|
   | Añade un manejador que navegue a la dirección correspondiente a los posts del autor indicado. Recuerda que    |
   | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/users', |
   | pasando como parámetro el identificador del autor.                                                            |
   |---------------------------------------------------------------------------------------------------------------*/
  
  gotoUserPosts(user: User): void {
    this._router.navigate(['posts', 'users', user.id]);
  }

  /*--------------------------------------------------------------------------------------------------------------------|
   | ~~~ Yellow Path ~~~                                                                                                |
   |--------------------------------------------------------------------------------------------------------------------|
   | Añade un manejador que navegue a la dirección correspondiente a los posts de la categoría indicada. Recuerda que   |
   | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/categories', |
   | pasando como parámetro el identificador de la categoría.                                                           |
   |--------------------------------------------------------------------------------------------------------------------*/

  gotoCategoryPosts(category: Category): void {
    this._router.navigate(['posts', 'categories', category.id]);  
  }

  gotoEditPost(post: Post): void {
    this._router.navigate(['posts', post.id, 'edit'])
  }

  addLike() {
    if (this.post.likes.indexOf(User.defaultUser().id) < 0) {
      this.post.likes.push(User.defaultUser().id);
      this._postService.patchLikes(this.post)
    }
  }

}
