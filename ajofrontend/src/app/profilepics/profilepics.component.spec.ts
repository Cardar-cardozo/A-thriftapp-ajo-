import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepicsComponent } from './profilepics.component';

describe('ProfilepicsComponent', () => {
  let component: ProfilepicsComponent;
  let fixture: ComponentFixture<ProfilepicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilepicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
