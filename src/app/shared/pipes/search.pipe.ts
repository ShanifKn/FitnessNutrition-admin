import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true, // Ensure this is included if it's a standalone pipe
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchKey: string): any[] {
    if (!items || !searchText || !searchKey) {
      return items;
    }

    searchText = searchText.toLowerCase();

    // Filter items and safely access searchKey
    return items.filter((item) =>
      item[searchKey]?.toLowerCase().includes(searchText) // Check if `item[searchKey]` exists before calling `toLowerCase`
    );
  }
}
