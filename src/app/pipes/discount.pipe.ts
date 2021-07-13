import { Pipe, PipeTransform } from '@angular/core';
import { Discount } from '../entities/discount';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(discount: Discount): string {
    let answer: string = discount.discountType.charAt(0).toUpperCase();
    answer += discount.discountType.substring(1, answer.length);


    return answer;
  }

}
