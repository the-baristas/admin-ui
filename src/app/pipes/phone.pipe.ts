import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phoneNumber: string): unknown {
    let formattedPhone = '';
    formattedPhone += "(" + phoneNumber.substring(0, 3) + ") ";
    formattedPhone += phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6, phoneNumber.length);
    return formattedPhone;
  }

}
