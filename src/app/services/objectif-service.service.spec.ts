import { TestBed } from '@angular/core/testing';

import { ObjectifServiceService } from './objectif-service.service';

describe('ObjectifServiceService', () => {
  let service: ObjectifServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectifServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
