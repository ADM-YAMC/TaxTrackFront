import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeTaxpayersComponent } from './add-type-taxpayers.component';

describe('AddTypeTaxpayersComponent', () => {
  let component: AddTypeTaxpayersComponent;
  let fixture: ComponentFixture<AddTypeTaxpayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTypeTaxpayersComponent]
    });
    fixture = TestBed.createComponent(AddTypeTaxpayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
