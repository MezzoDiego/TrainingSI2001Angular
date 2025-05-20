import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { MyHeaders } from '../config/my-table-config';

@Pipe({
  name: 'tableFilter',
  standalone: true,
})
export class TableFilterPipe implements PipeTransform {
  transform(
    data: any[],
    filterText: string,
    filterColumn: string,
    sortedColumn?: string,
    sortDirection?: 'asc' | 'desc',
    headers?: MyHeaders[]
  ): any[] {
    let filtered = data;

    if (filterText && filterColumn) {
      const header = headers?.find(h => h.key === filterColumn);

      filtered = data.filter(item => {
        const rawValue = item[filterColumn];
        const displayValue = header?.valueGetter
          ? header.valueGetter(item)
          : rawValue;

        return displayValue
          ?.toString()
          .toLowerCase()
          .includes(filterText.toLowerCase());
      });
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
