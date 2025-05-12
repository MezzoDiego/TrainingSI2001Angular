import { Component } from '@angular/core';
import { MyButtonComponent } from "./shared/components/my-button/my-button.component";
import { MyButtonConfig } from './shared/components/my-button/my-button-config';
import { MyTableComponent } from './shared/components/my-table/my-table.component';
import { MyTableConfig } from './shared/components/my-table/my-table-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyButtonComponent, MyTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    buttonConfig: MyButtonConfig = {
    customCssClass: 'btn btn-primary',
    text: 'Click me',
    icon: 'fa fa-hand-pointer-o'
  };
  tableConfig: MyTableConfig = {
    headers: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'email', label: 'Email' }
    ]
  };

  data = [
  { name: 'Mario', age: 30, email: 'mario@example.com' },
  { name: 'Luca', age: 25, email: 'luca@example.com' }
  ];
}
