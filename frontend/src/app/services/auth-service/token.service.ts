import { Injectable } from "@angular/core";
import { CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })

  export class tokenService{
        
        constructor(private cookieService: CookieService){ }
    
        storeTokenToCookie(token: string) {
          this.cookieService.set('jwtToken', token, { expires: 1, path: '' });
        }

        getTokenFromCookie(){
            return this.cookieService.get('jwtToken')
        }

        getDetailsFromToken(){
          const token = this.getTokenFromCookie()
          if(token){
            return jwtDecode(token)
          }
          return null
        }
  } 