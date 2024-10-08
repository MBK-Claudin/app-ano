import { TestBed } from '@angular/core/testing';

import { AnoService } from './ano.service';

describe('AnoService', () => {
  let service: AnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
