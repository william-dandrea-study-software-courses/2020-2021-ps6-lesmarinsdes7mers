import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimQuizzHomepageComponent } from './anim-quizz-homepage.component';

describe('AnimQuizzHomepageComponent', () => {
  let component: AnimQuizzHomepageComponent;
  let fixture: ComponentFixture<AnimQuizzHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimQuizzHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimQuizzHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
