import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCorrectionListComponent } from './quiz-correction-list.component';

describe('QuizResultListComponent', () => {
  let component: QuizCorrectionListComponent;
  let fixture: ComponentFixture<QuizCorrectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCorrectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCorrectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
