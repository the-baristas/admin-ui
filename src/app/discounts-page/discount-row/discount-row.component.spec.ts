import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRowComponent } from './discount-row.component';

describe('DiscountRowComponent', () => {
  let component: DiscountRowComponent;
  let fixture: ComponentFixture<DiscountRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
