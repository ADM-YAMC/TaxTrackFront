import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaxpayersComponent } from './view-taxpayers.component';

describe('ViewTaxpayersComponent', () => {
  let component: ViewTaxpayersComponent;
  let fixture: ComponentFixture<ViewTaxpayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaxpayersComponent]
    });
    fixture = TestBed.createComponent(ViewTaxpayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
