import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter',
  standalone: true
})
export class TableFilterPipe implements PipeTransform {

  transform(data: any[], filterText: string, filterColumn: string, sortedColumn?: string, sortDirection?: 'asc' | 'desc'): any[] {
  let filtered = data;
  
  if (filterText && filterColumn) {
    filtered = data.filter(item =>
      item[filterColumn]?.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  }

  if (sortedColumn) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortedColumn];
      const bVal = b[sortedColumn];

      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  return filtered;
  }

}
