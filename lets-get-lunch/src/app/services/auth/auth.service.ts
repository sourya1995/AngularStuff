import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, pipe } from 'rxjs';
import { User } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signup(credentials: User): Observable<object> {
    return this.http.post('https://url:3000/api/users', credentials).pipe(
      mergeMap(response => this.login(credentials)) 
    );
  }

  login(credentials: User): Observable<object> {
    return this.http.post('https://url:3000/api/sessions', credentials).pipe(
      map((res:any) => {
        localStorage.setItem('Authorization', res.token);
        return res;
      })
    );
  };

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }
}
