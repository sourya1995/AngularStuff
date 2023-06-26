import { Component, OnInit } from '@angular/core';
import { User } from '../services/auth/user';
import { AuthService } from '../services/auth/auth.service';
import { DietaryPreferencesService } from '../services/dietary-preferences/dietary-preferences.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = {'username': '', 'password': ''};
  dietPreferences;

  errorMessage: string;

  constructor(private authService: AuthService, private dietaryPreferencesService: DietaryPreferencesService) {
    
  }

  ngOnInit(): void {
    this.dietPreferences = this.dietaryPreferencesService.getDietaryPreferences();
  }

  signup(credentials: User){
    credentials.dietPreferences = this.getSelectedPreferences();
    this.authService.signup(credentials).subscribe(res => {
      console.log('res',res);
    }, err => {
      this.errorMessage = err.error.errorMessage;
    });
  }



  

  onPrefCheck(index) {
    if(this.dietPreferences[index].checked === true) {
      this.dietPreferences[index].checked = false;
    } else {
      this.dietPreferences[index].checked = true;
    }
  }

  getSelectedPreferences(){
    return this.dietPreferences
    .filter((preference) => {
      if(preference.checked === true){ return preference; }
    })
    .map((preference) => {
      return preference.name;
    })
  }


  

}
