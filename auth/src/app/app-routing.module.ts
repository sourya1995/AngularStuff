import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { SecretComponent } from './secret/secret.component';

const authOnly = () => redirectUnauthorizedTo(['']);
const guestOnly = () => redirectLoggedInTo(['secret']);

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: guestOnly}},
  {path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: guestOnly}},
  {path: 'secret', component: SecretComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: authOnly}},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
