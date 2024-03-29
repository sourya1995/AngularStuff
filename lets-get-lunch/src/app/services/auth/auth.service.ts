import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, pipe } from 'rxjs';
import { User } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn = EventEmitter<boolean>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loggedIn = new EventEmitter();
   }

  signup(credentials: User): Observable<object> {
    return this.http.post('https://url:3000/api/users', credentials).pipe(
      mergeMap(response => this.login(credentials)) 
    );
  }

  login(credentials: User): Observable<object> {
    return this.http.post('https://url:3000/api/sessions', credentials).pipe(
      map((res:any) => {
        localStorage.setItem('Authorization', res.token);
        this.loggedIn.emit(true);
        return res;
      })
    );
  };

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  logout(){
    localStorage.removeItem('Authorization');
    this.loggedIn.emit(false);
  }

  currentUser(){
    return this.jwtHelper.decodeToken(localStorage.getItem('Authorization'));
  }
}
