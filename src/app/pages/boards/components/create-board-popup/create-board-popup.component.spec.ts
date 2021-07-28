import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardPopupComponent } from './create-board-popup.component';

describe('CreateBoardPopupComponent', () => {
  let component: CreateBoardPopupComponent;
  let fixture: ComponentFixture<CreateBoardPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBoardPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
