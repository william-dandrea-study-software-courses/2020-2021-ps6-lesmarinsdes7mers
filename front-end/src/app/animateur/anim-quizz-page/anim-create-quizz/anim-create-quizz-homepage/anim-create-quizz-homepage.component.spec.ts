import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimCreateQuizzHomepageComponent } from './anim-create-quizz-homepage.component';

describe('AnimCreateQuizzHomepageComponent', () => {
  let component: AnimCreateQuizzHomepageComponent;
  let fixture: ComponentFixture<AnimCreateQuizzHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimCreateQuizzHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimCreateQuizzHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
