import { TestBed } from '@angular/core/testing';

import { UnplashService } from './unplash.service';

describe('UnplashServiceService', () => {
  let service: UnplashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnplashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
