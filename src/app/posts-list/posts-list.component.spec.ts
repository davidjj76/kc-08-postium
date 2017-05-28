import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PostPreviewComponent } from './../post-preview/post-preview.component';
import { PostsListComponent } from './posts-list.component';
import { FromNowPipe } from './../from-now.pipe';

class RouterStub {
  navigate(params) { }
}

describe('PostsListComponent', () => {

  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostPreviewComponent,
        PostsListComponent,
        FromNowPipe
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    });
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
  });

  it('Debería instanciarse', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
