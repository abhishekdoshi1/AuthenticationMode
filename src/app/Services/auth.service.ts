import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../auth/appModels/user.model';
import { AuthResponse } from '../auth/auth-resoponce.inerface';
import {config} from '../Services/config'
import {catchError, tap} from 'rxjs/operators'
import { ErrorServiceService } from './error-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private _errService : ErrorServiceService) { this.autoSingIn() }
  user = new Subject<User>();
  public isprogressbarloading :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  signup(email , password)
  {
    return  this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIWE7q2fuRMcgMbBUhHVtK1swX_QiSZ0U`,
  {
  email : email,
  password : password,
  returnSecureToken : true
  }).pipe(
    catchError(err=>{
      return  this._errService.handleError(err);
    }),
    tap(res=>{
        this.authenticationUser(res.email,res.localId, res.idToken ,res.expiresIn)
    })
  )  

  }

  signIn(email,password)
  {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIWE7q2fuRMcgMbBUhHVtK1swX_QiSZ0U',
    {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      catchError(err=>{
        return  this._errService.handleError(err);
      }),
      tap(res=>{
          this.authenticationUser(res.email, res.localId, res.idToken ,res.expiresIn); 
      })
    )  
  }

autoSingIn()
{
  const userdata = JSON.parse(localStorage.getItem('UserData'));
  console.log("UserData=>",userdata);
  if(!userdata)
  {return;}

    const loggedinuser = new User(userdata.email , userdata.id , userdata._token , userdata._tokenExpirationDate)
    console.log("LoggedInUserData===>",loggedinuser);
    if(loggedinuser.token)
    {
      this.user.next(loggedinuser)
    }

  }


  resetPasswordLink(data)
  {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAIWE7q2fuRMcgMbBUhHVtK1swX_QiSZ0U',
    {
      requestType: "PASSWORD_RESET",
      email : data.Resetpassword,

    }).pipe(
      catchError(err=>{
        return  this._errService.handleError(err);
      })
    )  
  }

  private authenticationUser(email , localId , idToken , expiresIn)
{

        const expirationDate = new Date(new Date().getTime()+ expiresIn*1000);
        const user = new User(email , localId , idToken , JSON.stringify(expirationDate))
        //console.log("responce===>",user);
        this.user.next(user);
        localStorage.setItem('UserData', JSON.stringify(user));
 }


}
