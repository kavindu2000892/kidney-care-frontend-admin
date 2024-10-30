import { TestBed } from '@angular/core/testing';

import { CookiemanagerService } from './cookiemanager.service';

describe('CookiemanagerService', () => {
  let service: CookiemanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiemanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
