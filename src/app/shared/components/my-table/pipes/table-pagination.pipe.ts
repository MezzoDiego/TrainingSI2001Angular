import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablePagination',
  standalone: true
})
export class TablePaginationPipe implements PipeTransform {

  transform(data: any[], currentPage: number, itemPerPage?: number): any[] {
    if (!data || !itemPerPage) return data;
    const start = (currentPage - 1) * itemPerPage;
    return data.slice(start, start + itemPerPage);
  }

}
