import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysDifference',
  standalone: true,
})
export class DaysDifferencePipe implements PipeTransform {
  transform(endDate: Date): string {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    if (!endDate) return '-';

    const startTime = new Date().getTime();

    const endTime = new Date(endDate).getTime();

    const differenceInMilliseconds = Math.abs(endTime - startTime);

    const daysDifference = Math.round(
      differenceInMilliseconds / millisecondsPerDay
    );

    return daysDifference + (daysDifference > 1 ? ' days' : ' day');
  }
}
