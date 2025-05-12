import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyButtonComponent } from "./shared/components/my-button/my-button.component";
import { MyButtonConfig } from './shared/components/my-button/my-button-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    buttonConfig: MyButtonConfig = {
    customCssClass: 'btn btn-primary',
    text: 'Click me',
    icon: 'fa fa-hand-pointer-o'
  };
}
