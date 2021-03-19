import { TestBed } from '@angular/core/testing';

import { EnvironmentUrlServiceService } from './environment-url-service.service';

describe('EnvironmentUrlServiceService', () => {
  let service: EnvironmentUrlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentUrlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
