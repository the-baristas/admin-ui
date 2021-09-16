import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRowComponent } from './payment-row.component';

describe('PaymentRowComponent', () => {
  let component: PaymentRowComponent;
  let fixture: ComponentFixture<PaymentRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
