import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiscountService } from '../../services/discount.service';
import { Discount } from '../../entities/discount';
import { DiscountRowComponent } from './discount-row.component';
import { of } from 'rxjs';

describe('DiscountRowComponent', () => {
  let component: DiscountRowComponent;
  let fixture: ComponentFixture<DiscountRowComponent>;
  let discountServiceMock: jasmine.SpyObj<DiscountService>;
  let debugElement: DebugElement;
  let element: Element;
  let formBuilder!: FormBuilder;

  let discount: Discount = { discountType: "nothing", discountRate: 0.5 };

  beforeEach(async () => {
    discountServiceMock = jasmine.createSpyObj('DiscountService', ['updateDiscount']);
    discountServiceMock.updateDiscount.and.returnValue(of(discount));

    await TestBed.configureTestingModule({
      declarations: [DiscountRowComponent],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: DiscountService, useValue: discountServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRowComponent);
    component = fixture.componentInstance;
    component.discount = discount;
    fixture.detectChanges();

    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;

    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mock discount data', () => {
    //name of discount displays and is capitalized
    const header = element.querySelector('h5');
    expect(header?.innerText).toEqual('Nothing');

    //form is pre-filled with current rate as a percentage
    expect(component.editRate.value).toEqual(discount.discountRate * 100);
    expect(component.editRate.disabled).toBeTruthy();
  });

  it('edit and cancel buttons', () => {
    spyOn(component, 'onClickEdit').and.callThrough();
    spyOn(component, 'onClickCancel').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button?.innerText).toEqual('Edit');

    button.click();

    expect(component.onClickEdit).toHaveBeenCalled();
    expect(component.editRate.enabled).toBeTruthy();

    //after clicking edit, there should now be save and cancel buttons
    fixture.detectChanges();

    let newButtons = fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(newButtons[0].innerText).toEqual('Save');
    expect(newButtons[1].innerText).toEqual('Cancel');

    newButtons[1].click();
    expect(component.onClickCancel).toHaveBeenCalled();
    expect(component.editRate.disabled).toBeTruthy();

    //after clicking save, edit button should show again
    fixture.detectChanges();
    button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.innerText).toEqual('Edit');

  })

  it('edit and cancel buttons', () => {
    spyOn(component, 'onClickSave').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    //after clicking edit, there should now be save and cancel buttons
    fixture.detectChanges();

    let saveButton = fixture.debugElement.nativeElement.querySelectorAll('button')[0];

    saveButton.click();
    expect(component.onClickSave).toHaveBeenCalled();
    expect(component.editRate.disabled).toBeTruthy();
    expect(discountServiceMock.updateDiscount).toHaveBeenCalled();

    //after clicking save, edit button should show again
    fixture.detectChanges();
    button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.innerText).toEqual('Edit');
  })

});
