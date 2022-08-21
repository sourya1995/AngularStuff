import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Match } from '../validators/match';
import { CompromisedPassword } from '../validators/compromised-password';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ], [this.compromisedPassword.validate]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ])
  }, {
    validators: [this.match.validate]
  });

  constructor(private match: Match, private compromisedPassword: CompromisedPassword,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async register() {
    if (this.registerForm.invalid) {
      return;
    }

    const {email, password} = this.registerForm.value;

    try {
      let result = await this.authService.signUp(email!, password!);
      this.router.navigateByUrl('/secret')
      console.log(result);

    } catch(e) {
      this.registerForm.setErrors({registrationFailed: true});
    }

    console.log('submitted');
  }

}