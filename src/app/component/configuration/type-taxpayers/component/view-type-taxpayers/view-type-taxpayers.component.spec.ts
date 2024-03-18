import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTypeTaxpayersComponent } from './view-type-taxpayers.component';

describe('ViewTypeTaxpayersComponent', () => {
  let component: ViewTypeTaxpayersComponent;
  let fixture: ComponentFixture<ViewTypeTaxpayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTypeTaxpayersComponent]
    });
    fixture = TestBed.createComponent(ViewTypeTaxpayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
