import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxpayersComponent } from './add-taxpayers.component';

describe('AddTaxpayersComponent', () => {
  let component: AddTaxpayersComponent;
  let fixture: ComponentFixture<AddTaxpayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaxpayersComponent]
    });
    fixture = TestBed.createComponent(AddTaxpayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
