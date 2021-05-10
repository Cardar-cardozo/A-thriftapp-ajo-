import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostajoComponent } from './postajo.component';

describe('PostajoComponent', () => {
  let component: PostajoComponent;
  let fixture: ComponentFixture<PostajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
