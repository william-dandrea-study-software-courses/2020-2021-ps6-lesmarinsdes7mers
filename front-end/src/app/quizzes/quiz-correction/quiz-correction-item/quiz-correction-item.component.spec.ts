import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCorrectionItemComponent } from './quiz-correction-item.component';

describe('QuizResultItemComponent', () => {
  let component: QuizCorrectionItemComponent;
  let fixture: ComponentFixture<QuizCorrectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCorrectionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCorrectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
