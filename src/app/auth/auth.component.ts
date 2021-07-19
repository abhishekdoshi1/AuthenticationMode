import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ErrorServiceService } from '../Services/error-service.service';
import { ErrorService } from '../Services/error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  sendEmail:any;
  signInForm : FormGroup
  loginMode:boolean = true;
   error;
   getErrorMessage = this._errormessage.errorMsg;
  constructor( private fb: FormBuilder , private authservice : AuthService , private _errormessage :ErrorServiceService , private router : Router) { }



  ngOnInit() {

        this.signInForm = this.fb.group({
            email:['',[Validators.required, Validators.email]],
            password :['',[Validators.required , Validators.minLength(8)]]
          
          })
          console.log("Ahss");

    
  }

  onModeSwitch()
  {
      this.loginMode= !this.loginMode;
  }

  onSubmit()
  {
      // if(this.signInForm.valid)
      // { 
      //   console.log(this.signInForm.value);
      // }
   
      if(this.loginMode)
      {
      
        const email = this.signInForm.value.email;  
        const password = this.signInForm.value.password;
       
          sessionStorage.setItem("Email", email);

        this.authservice.signIn(email , password).subscribe(
          res=>{ 
            console.log(res, "sign In Successfull")
            this.router.navigate(['/DashBoard']);

          }, 
          err=>{
            console.log(err)
            this.error = err
          

             

        })
      }
      else
      {
      const email = this.signInForm.value.email;  
      const password = this.signInForm.value.password;

      this.authservice.signup(email , password).subscribe(
        res=>{ 
          console.log(res , "sign up Successfull Please Log In")
        }, 
        err=>{
          console.log(err)
        
      })
    }
  }
}
