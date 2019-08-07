import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:boolean;
  loginErrorMessage:string;
  loginForm: FormGroup;
  constructor(
    private router:Router,
    private authService:AuthService,
    private fb:FormBuilder
  ) { }

  login(){
    this.authService.login().subscribe(response=>{
      if(response==true){
        this.loginError = false;
        this.router.navigate(['']);
      }
      else{
        this.loginError = true;
        this.loginErrorMessage = "Failure to authenticate";
      }
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
