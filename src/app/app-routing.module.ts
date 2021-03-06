import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

import { SecuredInnerPagesGuard } from "./shared/guard/secured-inner-pages.guard";
import { AuthGuard } from './shared/guard/auth.guard';
// import { RequestPermissionComponent } from './components/request-permssion/request-permission/request-permission.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'admin-panel', component: AdminpanelComponent, canActivate: [ AuthGuard ] },
  { path: 'sign-in', component: SigninComponent, canActivate: [ SecuredInnerPagesGuard ] },
  { path: 'sign-up', component: SignupComponent, canActivate: [ SecuredInnerPagesGuard ] },
  { path: 'forgot-password', component: ForgetPasswordComponent, canActivate: [ SecuredInnerPagesGuard ] },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [ SecuredInnerPagesGuard ] },
  // { path: 'request-permission', component: RequestPermissionComponent, canActivate: [ SecuredInnerPagesGuard ] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
