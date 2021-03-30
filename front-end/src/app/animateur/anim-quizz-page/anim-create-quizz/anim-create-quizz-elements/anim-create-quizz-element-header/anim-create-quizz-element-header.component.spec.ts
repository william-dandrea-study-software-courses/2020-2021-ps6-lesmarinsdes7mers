import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimCreateQuizzElementHeaderComponent } from './anim-create-quizz-element-header.component';

describe('AnimCreateQuizzElementHeaderComponent', () => {
  let component: AnimCreateQuizzElementHeaderComponent;
  let fixture: ComponentFixture<AnimCreateQuizzElementHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimCreateQuizzElementHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimCreateQuizzElementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
