import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhIconComponent } from './nh-icon.component';

describe('NhIconComponent', () => {
  let component: NhIconComponent;
  let fixture: ComponentFixture<NhIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
