import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  getEmail :any;
  showFiller = false;
  count = 1;
  counter: any;
  emaill: any;
  password: any;
  form :FormGroup;
  constructor(private _authservice:AuthService , changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 65px)');
  }


  
  ngOnInit() {
      
      this.form = new FormGroup({
        myControl: new FormControl(new Date())
      });
      this.getEmail = sessionStorage.getItem("Email");
      console.log("EmailID", this.getEmail);
  }
    
}
