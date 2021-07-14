import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Discount } from '../entities/discount';
import { Page } from '../entities/page';
import { DiscountService } from '../services/discount.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {
  public discounts: Discount[] = [];

  totalDiscounts: number = 0;
  currentPage!: Page<Discount>;
  pageSize: number = 10;
  pageNumber: number = 0;

  constructor(private discountService: DiscountService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDiscounts(this.pageNumber, this.pageSize);
  }

  getDiscounts(page: number, size: number): void {
    this.discountService.getAllDiscounts(page, size).subscribe(
      (response: Page<Discount>) => {
        this.currentPage = response;
        this.pageNumber = response.number + 1;
        this.discounts = response.content;
        this.totalDiscounts = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.currentPage.totalPages) {
      return;
    } else {
      this.getDiscounts(page - 1, this.pageSize);
    }
  }

}
