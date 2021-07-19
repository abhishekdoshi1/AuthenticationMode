import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [

    {path: '' , component:AuthComponent},
    {path:'DashBoard', component : DashboardComponent},
    {path:'PasswordReset' , component : PasswordResetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

   
}
