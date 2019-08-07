import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BioComponent } from './bio/bio.component';
import { BioDetailsComponent } from './bio-details/bio-details.component';
import { CreateBioComponent } from './create-bio/create-bio.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'bio', component: BioComponent },
  { path:'bio/:id', component: BioDetailsComponent },
  { 
    path:'create-bio', 
    component: CreateBioComponent,
    canActivate: [AuthService],
    canDeactivate: [AuthService]
  },
  { path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
