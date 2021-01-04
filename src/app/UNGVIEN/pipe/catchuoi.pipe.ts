import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catchuoi'
})
export class CatchuoiPipe implements PipeTransform {

  transform(value: string,length:number,last?:string): any {
    if(last=="last"){
      if(value){
        return value.slice(0,value.length - length);
      }
    }
    else if(value){
      return value.substr(length);
    }
  }

}
