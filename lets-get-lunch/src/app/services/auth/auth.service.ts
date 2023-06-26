import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, pipe } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
}
