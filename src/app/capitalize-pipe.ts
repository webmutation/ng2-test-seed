import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {
    transform(value){
        if (typeof value === 'string')
            return value.toUpperCase();
        throw new Error('Requires a String as input');
    }
}