import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileQuery: MediaQueryList;
  isSignIn = false; 
  getEmail: string;
 
  constructor(private  _authservice : AuthService , private router : Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 65px)');
   }

  ngOnInit() {

    this._authservice.user.subscribe(res=>{

        if(res)
        {
          this.isSignIn = true;
          this.getEmail = sessionStorage.getItem("Email");
        }
        else
        {
          this.isSignIn = false;
           
        }
    })

   
    console.log("EmailID", this.getEmail);
  } 

  SignOut()
  {
    this.router.navigate(['/']);
    this.isSignIn = false;
    sessionStorage.removeItem("Email");
    this.getEmail = '';
   
  }
}
