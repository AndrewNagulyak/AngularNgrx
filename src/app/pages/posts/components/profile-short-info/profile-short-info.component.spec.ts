import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShortInfoComponent } from './profile-short-info.component';

describe('ProfileShortInfoComponent', () => {
  let component: ProfileShortInfoComponent;
  let fixture: ComponentFixture<ProfileShortInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileShortInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
