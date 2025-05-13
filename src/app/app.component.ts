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
  },
  pagination: {
    itemPerPage: 10,
    itemPerPageOptions: [5, 10, 20, 50],
  }
  };

  data = [
    { name: 'Mario', age: 30, email: 'mario@example.com' },
    { name: 'Luca', age: 25, email: 'luca@example.com' },
    { name: 'Luigi', age: 33, email: 'luigi@example.com' },
    { name: 'Laura', age: 24, email: 'laura@example.com' },
    { name: 'Gigi', age: 21, email: 'gigi@example.com' },
    { name: 'Pippo', age: 22, email: 'pippo@example.com' },
    { name: 'Federica', age: 27, email: 'federica@example.com' },
    { name: 'Filippo', age: 30, email: 'filippo@example.com' },
    { name: 'Gaston', age: 25, email: 'gaston@example.com' },
    { name: 'Federico', age: 33, email: 'federico@example.com' },
    { name: 'Pluto', age: 24, email: 'pluto@example.com' },
    { name: 'Tizio', age: 21, email: 'tizio@example.com' },
    { name: 'Merit', age: 22, email: 'merit@example.com' },
    { name: 'Gallo', age: 27, email: 'gallo@example.com' },
    { name: 'Bravo', age: 30, email: 'bravo@example.com' },
    { name: 'Ionio', age: 25, email: 'ionio@example.com' },
    { name: 'Plutone', age: 33, email: 'plutone@example.com' },
    { name: 'Goal', age: 24, email: 'goal@example.com' },
    { name: 'Gatto', age: 21, email: '1as@example.com' },
    { name: 'Cane', age: 22, email: '2asdas@example.com' },
    { name: 'Feffo', age: 27, email: '3ddd@example.com' },
    { name: 'Drago', age: 30, email: '4aaa@example.com' },
    { name: 'Malfoi', age: 25, email: 'dsad5@example.com' },
    { name: 'Dollar', age: 33, email: '6xzcz@example.com' },
    { name: 'Lino', age: 24, email: 'lauranooo@example.com' },
    { name: 'Peppe', age: 21, email: 'gigiasdas@example.com' },
    { name: 'Geppetto', age: 22, email: 'pidspasdpo@example.com' },
    { name: 'Pinocchio', age: 27, email: 'federicsssa23@example.com' },
    { name: 'Madagascar', age: 30, email: 'marionenazionale@example.com' },
    { name: 'Fanta', age: 25, email: 'oleee@example.com' },
    { name: 'Calcio', age: 33, email: 'luigasdai@example.com' },
    { name: 'Bosco', age: 24, email: '1laursdda@example.com' },
    { name: 'Prato', age: 21, email: 'pratinopratello@example.com' },
    { name: 'Hotel', age: 22, email: 'california@example.com' },
    { name: 'Nirvana', age: 27, email: 'wow21@example.com' }
  ];
}
