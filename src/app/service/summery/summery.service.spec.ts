import { TestBed } from '@angular/core/testing';

import { SummeryService } from './summery.service';

describe('SummeryService', () => {
  let service: SummeryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummeryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
