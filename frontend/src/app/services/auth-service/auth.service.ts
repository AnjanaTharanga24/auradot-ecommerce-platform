import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class AuthService{
    private baseUrl = environment.baseUrl;
    
    constructor(){ }

    signup(formData: any): Promise<any> {

        return axios.post(`${this.baseUrl}/v1/user/signup`, formData, {
          headers: {'Content-Type': 'application/json'}
        })
          .then(response => {
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
                    return response;
                }
            )
            .catch(error => {
                throw error.response.data;
            })
    }

  }