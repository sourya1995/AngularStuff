import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SignupModule } from './signup.module';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';


class MockAuthService {
  signup(credentials){}
}

class MockRouter {
  navigate(path){}
}

class SignupPage {
  submitBtn: DebugElement;
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  dietPreference: DebugElement[];

  addPageElements(){
    this.submitBtn = fixture.debugElement.query(By.css('button'));
    this.usernameInput = fixture.debugElement.query(By.css('[name=username]')).nativeElement;
    this.passwordInput = fixture.debugElement.query(By.css('[name=password]')).nativeElement;
    this.dietPreference = fixture.debugElement.queryAll(By.css('[name=preference]'));

  }
}

let component: SignupComponent;
let fixture: ComponentFixture<SignupComponent>;
let signupPage: SignupPage;
let authService: AuthService;
let router: Router;

describe('SignupComponent', () => {


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ SignupModule ]

    }).overrideComponent(SignupComponent, {
      set: {
        providers: [ 
          {provide: AuthService, useClass: MockAuthService},
          { provide: Router, useClass: MockRouter}
        ]
      }
    }).compileComponents();
  });

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    signupPage = new SignupPage();
    authService = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      signupPage.addPageElements();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a user with valid credentials and diet preferences', () => {
    signupPage.usernameInput.value = 'johndoe';
    signupPage.passwordInput.value = 'password';
    signupPage.usernameInput.dispatchEvent(new Event('input'));
    signupPage.passwordInput.dispatchEvent(new Event('input'));
    signupPage.dietPreference[0].nativeElement.click();
    signupPage.dietPreference[1].nativeElement.click();

    spyOn(authService, 'signup').and.callFake(() => {
      return of({token: 'sometoken'});
    });
    spyOn(router, 'navigate');

    signupPage.submitBtn.nativeElement.click();

    expect(authService.signup).toHaveBeenCalledWith({
      username: 'johndoe',
      password: 'password',
      dietPreferences: ['BBQ', 'Burger']
    });

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should display an error message with invalid credentials', () => {
    signupPage.usernameInput.value = 'janedoe';
    signupPage.passwordInput.value = 'pass';
    signupPage.usernameInput.dispatchEvent(new Event('input'));
    signupPage.passwordInput.dispatchEvent(new Event('input'));

    spyOn(authService, 'signup').and.callFake(() => {
      return throwError ({
        error: {
          message: 'your password must be at least 5 characters long';
        }
      });
    });
    signupPage.submitBtn.nativeElement.click();
    fixture.detectChanges();
    const errorMessage: DebugElement= fixture.debugElement.query(By.css('.alert'));
    expect(errorMessage.nativeElement.textContent)
    .toEqual('Your password must be at least 5 characters long');
  });
});
