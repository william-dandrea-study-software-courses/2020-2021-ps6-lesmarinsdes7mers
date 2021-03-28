import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultItemComponent } from './quiz-result-item.component';

describe('QuizResultItemComponent', () => {
  let component: QuizResultItemComponent;
  let fixture: ComponentFixture<QuizResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizResultItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
