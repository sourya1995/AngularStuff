import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(){
    if(this.loginForm.invalid){
      return;
    }

    const {email, password} = this.loginForm.value;
    try {
      let result = await this.authService.signIn(email!, password!);
      this.router.navigateByUrl('/secret');
    } catch(e) {
      this.loginForm.setErrors({loginFailed: true})
    }

    
    
  }

}
