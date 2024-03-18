import { TestBed } from '@angular/core/testing';

import { LoadInterceptorService } from './load-interceptor.service';

describe('LoadInterceptorService', () => {
  let service: LoadInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
