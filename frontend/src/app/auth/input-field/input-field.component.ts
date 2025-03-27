import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() type: String = 'text'; 
  @Input() value!: any;
  @Input() placeholder: string = '';
  @Input() control!: FormControl; 
  @Input() isReadonly: boolean = false
  @Input() errorMessages!: { [key: string]: string};

  errorKeys: string[] = [];

  ngOnChanges(): void {
    if (this.errorMessages) {
      this.errorKeys = Object.keys(this.errorMessages);
    }
  }
}
