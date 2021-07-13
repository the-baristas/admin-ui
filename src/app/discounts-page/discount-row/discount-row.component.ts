import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Discount } from '../../entities/discount';
import { DiscountService } from '../../services/discount.service';

@Component({
  selector: 'app-discount-row',
  templateUrl: './discount-row.component.html',
  styleUrls: ['./discount-row.component.css']
})
export class DiscountRowComponent implements OnInit {
  @Input('discount') discount!: Discount;
  formattedType = '';
  ratePercentage = 0;

  editRate: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.min(0),
    Validators.maxLength(4),
    Validators.pattern("[0-9]+")
  ]);

  constructor(
    private discountService: DiscountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setDiscount(this.discount);
    this.editRate.setValue(this.ratePercentage);
    this.editRate.disable();
  }

  onClickEdit(): void {
    this.editRate.enable();
  }

  onClickSave(): void {
    this.discount.discountRate = this.editRate.value / 100;
    this.handleUpdateDiscount();
    this.editRate.disable();
  }

  onClickCancel(): void {
    this.editRate.disable();
    this.editRate.setValue(this.ratePercentage);
  }

  private handleUpdateDiscount(): void {
    this.discountService.updateDiscount(this.discount)
      .subscribe(
        (response: any) => {
          this.setDiscount(response);
        },
        (error: Error) => {
          alert(error);
        }
      )
  }

  private setDiscount(discount: Discount): void {
    this.formattedType = discount.discountType.charAt(0).toUpperCase()
      + discount.discountType.substring(1, discount.discountType.length);

    this.ratePercentage = discount.discountRate * 100;
  }

}
