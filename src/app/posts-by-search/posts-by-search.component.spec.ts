import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBySearchComponent } from './posts-by-search.component';

describe('PostsBySearchComponent', () => {
  let component: PostsBySearchComponent;
  let fixture: ComponentFixture<PostsBySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsBySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsBySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
