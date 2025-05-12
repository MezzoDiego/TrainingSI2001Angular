import { Component, Input } from '@angular/core';
import { MyTableConfig } from './my-table-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css',
})
export class MyTableComponent {
  @Input() tableConfig!: MyTableConfig;
  @Input() data!: any[];
}
