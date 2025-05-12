import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MyButtonConfig } from './my-button-config';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.css',
})
export class MyButtonComponent {
  @Input() buttonConfig!: MyButtonConfig;
}
