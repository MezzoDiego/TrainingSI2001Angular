import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-dialog',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './my-dialog.component.html',
  styleUrl: './my-dialog.component.css'
})
export class MyDialogComponent {

  closedDialog = output();
  operationConfirmed = output();

    closeDialog() {
    this.closedDialog.emit();
  }

  save() {
    this.operationConfirmed.emit();
  }
}
