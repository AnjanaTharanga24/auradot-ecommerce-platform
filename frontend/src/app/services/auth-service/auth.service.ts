import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class AuthService{
    private baseUrl = environment.baseUrl;

    private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken()); 
    authStatus$ = this.authStatusSubject.asObservable();
    
    constructor(){ }

    private hasToken(): boolean {
      return !!localStorage.getItem('jwtToken')
    }

    signup(formData: any): Promise<any> {

        return axios.post(`${this.baseUrl}/v1/user/signup`, formData, {
          headers: {'Content-Type': 'application/json'}
        })
          .then(response => {
            this.authStatusSubject.next(true)
            return response;
          })
          .catch(error => {
            throw error.response.data;
          });
      }

    signin(formData: any): Promise<any> {
        return axios.post(`${this.baseUrl}/v1/auth/signin`, formData, {
          headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
              this.authStatusSubject.next(true)
                    return response;
                }
            )
            .catch(error => {
                throw error.response.data;
            })
    }

  }