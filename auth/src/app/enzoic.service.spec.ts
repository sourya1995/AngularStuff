import { TestBed } from '@angular/core/testing';

import { EnzoicService } from './enzoic.service';

describe('EnzoicService', () => {
  let service: EnzoicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnzoicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
