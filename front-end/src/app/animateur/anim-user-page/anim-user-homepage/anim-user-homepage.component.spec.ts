import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimUserHomepageComponent } from './anim-user-homepage.component';

describe('AnimUserHomepageComponent', () => {
  let component: AnimUserHomepageComponent;
  let fixture: ComponentFixture<AnimUserHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimUserHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimUserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
