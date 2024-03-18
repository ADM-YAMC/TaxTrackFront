import { TestBed } from '@angular/core/testing';

import { TypeTaxpayersService } from './type-taxpayers.service';

describe('TypeTaxpayersService', () => {
  let service: TypeTaxpayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeTaxpayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
