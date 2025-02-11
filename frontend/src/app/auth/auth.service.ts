import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login() {
    console.log('Login successful');
  }

  register() {
    console.log('Registration successful');
  }

  
}
