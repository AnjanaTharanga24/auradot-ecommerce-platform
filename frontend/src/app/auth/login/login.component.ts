import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  isSubmitted:boolean = false;

  login(form: NgForm) {
    console.log(form.value);

    this.isSubmitted = true;

    if(form.valid){
      console.log("Forms is submitted");
    }else{
      console.log("Forms is not submitted");
    }
  }
}
