import { TestBed } from '@angular/core/testing';

import { TaxpayersService } from './taxpayers.service';

describe('TaxpayersService', () => {
  let service: TaxpayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxpayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
