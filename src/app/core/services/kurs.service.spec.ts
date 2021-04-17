import { TestBed } from '@angular/core/testing';

import { KursService } from './kurs.service';

describe('KursService', () => {
  let service: KursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
