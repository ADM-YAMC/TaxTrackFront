import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTaxpayersComponent } from './type-taxpayers.component';

describe('TypeTaxpayersComponent', () => {
  let component: TypeTaxpayersComponent;
  let fixture: ComponentFixture<TypeTaxpayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeTaxpayersComponent]
    });
    fixture = TestBed.createComponent(TypeTaxpayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
