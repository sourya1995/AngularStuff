import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { stringLength } from '@firebase/util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;


  constructor(public auth: AngularFireAuth) { 
    this.auth.authState.subscribe( (user) => {
      this.userData = user ? user : null;
    });
  }

  signUp(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.auth.signOut();
  }
}
