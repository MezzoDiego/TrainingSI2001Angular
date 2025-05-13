import { Component } from '@angular/core';
import { MyButtonComponent } from './shared/components/my-button/my-button.component';
import { MyButtonConfig } from './shared/components/my-button/my-button-config';
import { MyTableComponent } from './shared/components/my-table/my-table.component';
import { MyTableConfig } from './shared/components/my-table/my-table-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  tableConfig: MyTableConfig = {
    headers: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'email', label: 'Email' },
    ],
    order: {
      defaultColumn: 'name',
      orderType: 'asc',
    },
  search: {
    columns: ['name', 'age', 'email']
  }
  };

  data = [
    { name: 'Mario', age: 30, email: 'mario@example.com' },
    { name: 'Luca', age: 25, email: 'luca@example.com' },
    { name: 'Luigi', age: 33, email: 'luigi@example.com' },
    { name: 'Laura', age: 24, email: 'laura@example.com' },
    { name: 'Gigi', age: 21, email: 'gigi@example.com' },
    { name: 'Pippo', age: 22, email: 'pippo@example.com' },
    { name: 'Federica', age: 27, email: 'federica@example.com' }
  ];
}
