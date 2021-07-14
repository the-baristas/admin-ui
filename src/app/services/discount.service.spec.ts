import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Discount } from '../entities/discount';
import { Page } from '../entities/page';

import { DiscountService } from './discount.service';

describe('DiscountService', () => {
  let service: DiscountService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.bookingServiceUrl + '/discounts';
  let discounts: Discount[] = [
    {discountType: "type", discountRate: 0.5}
  ];

  let discountPage: Page<Discount> = {
    content: discounts,
    size: 2,
    totalPages: 1,
    number: 0,
    totalElements: 2,
    numberOfElements: 2,
    first: true,
    last: true,
    empty: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [DiscountService]
    });
    service = TestBed.inject(DiscountService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all discounts returns mock data', () => {
    service.getAllDiscounts(0, 10).subscribe((data) => {
      expect(data).toEqual(discountPage);
    });
    let mockRequest = httpTestingController.expectOne(
      apiUrl + '?index=0&size=10'
    );
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(discountPage);
  });

  it('update discount', () => {
    service.updateDiscount(discounts[0]).subscribe((data) => {
      expect(data).toEqual(discounts[0]);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(discounts[0]);
  })
});
