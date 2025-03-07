import { Injectable } from "@angular/core";
import { CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';


interface DecodedToken {
  sub: string;
  role: string;
  user_id: number;
  iat: number;
  exp: number;
}
@Injectable({
    providedIn: 'root'
  })

  export default class TokenService{
        
        constructor(private cookieService: CookieService){ }
    
        storeTokenToCookie(token: string) {
          this.cookieService.set('jwtToken', token, { expires: 1, path: '' });
        }

        getTokenFromCookie(){
            return this.cookieService.get('jwtToken')
        }

        removeTokenFromCookie(){
          return this.cookieService.delete('jwtToken', '/')
        }

        getDetailsFromToken(){
          const token = this.getTokenFromCookie()
          if(token){
            try{
              return jwtDecode<DecodedToken>(token)
            }catch(error){
              return null;
            }

          }
          return null
        }

        getRoleFromToken(){
          return this.getDetailsFromToken()?.role || null
        }

        isAuthenticated() {
          return !!this.getTokenFromCookie();
        }

        hasRole(role: string) {
          const userRole = this.getRoleFromToken();
          return userRole === role;
        }
  } 