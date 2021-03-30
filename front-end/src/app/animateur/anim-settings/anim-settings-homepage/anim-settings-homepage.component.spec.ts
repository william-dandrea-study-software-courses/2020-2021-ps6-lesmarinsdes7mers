import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimSettingsHomepageComponent } from './anim-settings-homepage.component';

describe('AnimSettingsHomepageComponent', () => {
  let component: AnimSettingsHomepageComponent;
  let fixture: ComponentFixture<AnimSettingsHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimSettingsHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimSettingsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
