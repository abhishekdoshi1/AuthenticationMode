import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetPasswordForm:FormGroup;

  constructor(private fb: FormBuilder, private authservice : AuthService) { }

 

  ngOnInit() {
  
      this.resetPasswordForm = this.fb.group({
        Resetpassword:['',[Validators.required]],
       
    })
  }


  sendEmail()
  {
      console.log("hi")
      //console.log( this.resetPasswordForm.value.password)
      const sendResetPasswordLink = this.resetPasswordForm.value;

          //console.log(sendResetPasswordLink);

        this.authservice.resetPasswordLink(this.resetPasswordForm.value).subscribe(
          res=>{
          console.log(res, "Email Send Successfull")
        },
          err=>
          {
              console.log(err);
              console.log("errors in Email send varification");
          })
  }

}