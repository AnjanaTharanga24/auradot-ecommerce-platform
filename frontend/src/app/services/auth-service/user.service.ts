import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environment';
import TokenService from './token.service';

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

    constructor(private tokenServices: TokenService) { } 

    getUser(): Promise<User> {

        const token = this.tokenServices.getTokenFromCookie();
        console.log("tokenUser : ", token)

        return axios
            .get(`${this.baseURL}/v1/auth/get-user-details`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            .then((response:AxiosResponse<User>)  => {
                console.log('response : ', response.data)
                return response.data;
            })
            .catch((error: any)  => {
                console.log('responseError : ',error.response?.data)

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
                return response;
            })
            .catch((error: any)  => {
                throw error.response?.data;
            });
    }
}
