import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimCreateQuizzElementGeneralQuizInfosComponent } from './anim-create-quizz-element-general-quiz-infos.component';

describe('AnimCreateQuizzElementGeneralQuizInfosComponent', () => {
  let component: AnimCreateQuizzElementGeneralQuizInfosComponent;
  let fixture: ComponentFixture<AnimCreateQuizzElementGeneralQuizInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimCreateQuizzElementGeneralQuizInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimCreateQuizzElementGeneralQuizInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
