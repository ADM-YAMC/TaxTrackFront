import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayersComponent } from './taxpayers.component';

describe('TaxpayersComponent', () => {
  let component: TaxpayersComponent;
  let fixture: ComponentFixture<TaxpayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxpayersComponent]
    });
    fixture = TestBed.createComponent(TaxpayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
