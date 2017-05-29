import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {

  constructor(private _router: Router) { }

  gotoSearchPosts(search: string) {
    const extras: NavigationExtras = {
      queryParams: {
        q: search
      }
    }
    this._router.navigate(['posts'], extras);
  }

}
