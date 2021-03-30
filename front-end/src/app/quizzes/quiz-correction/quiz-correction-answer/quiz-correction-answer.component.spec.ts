import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCorrectionAnswerComponent } from './quiz-correction-answer.component';

describe('QuizCorrectionAnswerComponent', () => {
  let component: QuizCorrectionAnswerComponent;
  let fixture: ComponentFixture<QuizCorrectionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCorrectionAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCorrectionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
