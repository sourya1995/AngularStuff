import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule , HttpTestingController} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

function tokenGetter(){
  return localStorage.getItem('Authorization');
}

fdescribe('AuthService', () => {
  let authService: AuthService;
  let http: HttpTestingController;
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter
        }
      })], 
      providers: [AuthService, JwtHelperService] });

    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    jwtHelper = TestBed.inject(JwtHelperService);
  });


  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a token with a valid username and password', () => {
      const user = { 'username': 'myUser', 'password': 'password' };
      const signupResponse = {
        '__v': 0,
        'username': 'myUser',
        'password': '$2a$10$oF7YW1FyOSW3Gw7G4ThbO.ibduCgF3U0gVI/GE9fKQcGtVEBs0B.2',
        '_id': '5a550ea739fbc4ca3ee0ce58',
        'dietPreferences': []
      };
      const loginResponse = { 'token' : 'someToken' };
      let response;

      authService.signup(user).subscribe(res => {
        response = res;
      });

      spyOn(authService, 'login').and.callFake(() => of(loginResponse));

      http.expectOne('https://url:3000/api/users').flush(signupResponse);
      expect(response).toEqual(loginResponse);
      expect(authService.login).toHaveBeenCalled();
      http.verify();
    });
  });

  it('should return an error for an invalid user object ', () => {
    const user = { username: 'myUser', password: 'pswd'};
    const signupResponse = 'Your password must be atleast 5 characters long';
    let errorResponse;

    authService.signup(user).subscribe(res => { }, err => {
      errorResponse = err;
    });

    http.expectOne('https://url:3000/api/users')
    .flush({message: signupResponse}. {status: 400, statusText: 'Bad Request'});
    expect(errorResponse.error.message).toEqual(signupResponse);
    http.verify();
  });

  describe('login', () => {
    it('should return a token with a valid username and password', () => {
      const user = { username: 'myUser', password: 'password' };
      const loginResponse = {'token' : 'someToken'};
      let response;

      authService.login(user).subscribe(res => {
        response = res;
      });
      spyOn(authService.loggedIn, 'emit');

      http.expectOne('https://someServer:3000/api/sessions').flush(loginResponse);
      expect(response).toEqual(loginResponse);
      expect(localStorage.getItem('Authorization')).toEqual('someToken');
      expect(authService.loggedIn.emit).toHaveBeenCalled();
      http.verify();
    })
  })

  describe('logout', () => {
    it('should clear the token from local storage', () => {
      spyOn(authService.isLoggedIn, 'emit');
      localStorage.setItem('Authorization', 'someToken');
      expect(localStorage.getItem('Authorization')).toEqual('someToken');
      authService.logout();

      expect(localStorage.getItem('Authorization')).toBeFalsy();
      expect(authService.loggedIn.emit).toHaveBeenCalled(false);
      http.verify();
    });
  })

  describe('isLoggedIn', () => {
    it('should return true if the user is logged in', () => {
      localStorage.setItem('Authorization', 'someToken');
      expect(authService.isLoggedIn()).toEqual(true);
    });

    it('should return false if the user is not logged in', () => {
      localStorage.removeItem('Authorization');
      expect(authService.isLoggedIn()).toEqual(false);
    });
  });

  describe('current user', () => {
    it('should return the current user with a valid token', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => 'someToken');
      spyOn(jwtHelper, 'decodeToken').and.callFake(() => {
        return {
          exp: 1517847480,
          iat: 1517847480,
          username: 'username',
          _id: '427590270957020f'
        } as any;
      });
      const res = authService.currentUser();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(res.username).toBeDefined();
      expect(res._id).toBeDefined();
    });
  });

});
