import { TestBed } from '@angular/core/testing';

import { GetMethodService } from './get-method.service';

describe('GetMethodService', () => {
  let service: GetMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
