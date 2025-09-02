import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beeTruncate'
})
export class BeeTruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 25): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit).trim() + '...' : value;
  }
}
