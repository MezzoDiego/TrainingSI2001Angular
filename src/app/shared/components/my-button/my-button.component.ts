import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { MyButtonConfig } from './config/my-button-config';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.css',
})
export class MyButtonComponent {
  buttonConfig = input.required<MyButtonConfig>();
  area = input<string>();
  buttonClick = output<{text: string, area: string}>();

  onClick() {
    this.buttonClick.emit({
      text: this.buttonConfig().text!,
      area: this.area()!
    });
  }
}
