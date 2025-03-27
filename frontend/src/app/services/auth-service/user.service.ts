import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environment';
import TokenService from './token.service';
import { BehaviorSubject } from 'rxjs';

export interface Role {
    roleId: number;
    roleName: string;
}
  
export interface User {
    userId: number;
    userName: string;
    userEmail: string;
    password: string;
    phoneNo: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private baseURL = environment.baseUrl

    private userSubject = new BehaviorSubject<User | null>(null)
    user$ = this.userSubject.asObservable()

    constructor(private tokenServices: TokenService) { } 

    getUser(): void {

        const token = this.tokenServices.getTokenFromCookie();

        axios
            .get(`${this.baseURL}/v1/auth/get-user-details`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            .then((response:AxiosResponse<User>)  => {
                this.userSubject.next(response.data)
            })
            .catch((error: any)  => {
                this.userSubject.next(null);
                throw error.response?.data;
            });
    }

    updateUser(formData: any): Promise<any>{

        const token = this.tokenServices.getTokenFromCookie();

        return axios
            .patch(`${this.baseURL}/v1/auth/update-user-details`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            .then((response: AxiosResponse<any>) => {
                this.userSubject.next(response.data)
                return response;
            })
            .catch((error: any)  => {
                this.userSubject.next(null)
                throw error.response?.data;
            });
    }
}
