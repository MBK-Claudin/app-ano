import { TestBed } from '@angular/core/testing';

import { ContributeurServicesService } from './contributeur-services.service';

describe('ContributeurServicesService', () => {
  let service: ContributeurServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContributeurServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
