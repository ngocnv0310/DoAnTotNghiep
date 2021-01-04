import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellip'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, length?: number): any {
    let size = 25
    if (length) {
      size = length
    }
    if (value.length > size) {
      return value.substring(0, size) + "...";
    }
    else {
      return value.substring(0, size);
    }
  }

}
