import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Discount } from '../../entities/discount';
import { Page } from '../../entities/page';
import { DiscountService } from '../../services/discount.service';

import { DiscountListComponent } from './discount-list.component';

describe('DiscountListComponent', () => {
  let component: DiscountListComponent;
  let fixture: ComponentFixture<DiscountListComponent>;
  let discountServiceMock: jasmine.SpyObj<DiscountService>;
  let debugElement: DebugElement;
  let element: Element;
  let formBuilder!: FormBuilder;

  let discount1: Discount = { discountType: "nothing", discountRate: 0.5 };
  let discount2: Discount = { discountType: "child", discountRate: 0.75 };

  let discountPage: Page<Discount> = {
    content: [discount1, discount2],
    size: 2,
    totalPages: 1,
    number: 0,
    totalElements: 2,
    numberOfElements: 2,
    first: true,
    last: true,
    empty: false
  };

  beforeEach(async () => {
    discountServiceMock = jasmine.createSpyObj('DiscountService', ['getAllDiscounts']);
    discountServiceMock.getAllDiscounts.and.returnValue(of(discountPage));

    await TestBed.configureTestingModule({
      declarations: [DiscountListComponent],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: DiscountService, useValue: discountServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should render title', () => {
    const header = element.querySelector('h3');
    expect(header?.innerText).toContain('Discount');
  })

  it('test getDiscounts', () => {
    component.getDiscounts(0, 2);

    expect(discountServiceMock.getAllDiscounts).toHaveBeenCalled();
    expect(component.currentPage).toEqual(discountPage);
  })
});
