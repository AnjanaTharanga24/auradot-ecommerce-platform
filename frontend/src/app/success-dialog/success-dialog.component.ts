import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog'; 


@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  imports: [MatIconModule,MatDialogModule],
  styleUrls: ['./success-dialog.component.css'] // Corrected to styleUrls
})
export class SuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<SuccessDialogComponent> // Inject MatDialogRef
  ) {}

  close(): void {
    this.dialogRef.close(); // Close the dialog
  }
}