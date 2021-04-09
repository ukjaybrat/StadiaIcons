import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';
import { StoreComponent } from '../../components/store/store.component';

import { SignInComponent } from '../../components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/auth/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/auth/verify-email/verify-email.component';

import { AuthGuard } from "../../shared/guard/auth.guard";

const routes: Routes = [
  { path: '', 										component: HomeComponent},
  { path: 'home', 								redirectTo: '', pathMatch: 'full'},
  { path: 'store', 								component: StoreComponent},

	{ path: 'sign-in', 							component: SignInComponent},
  { path: 'register-user', 				component: SignUpComponent},
  { path: 'dashboard', 						component: DashboardComponent, 			 canActivate: [AuthGuard] },
  { path: 'forgot-password', 			component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
