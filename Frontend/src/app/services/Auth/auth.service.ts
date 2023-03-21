import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isRegistered = false
  isLoggedIn = false
  private is_admin = ''
  public fullname = ''
  // private registermessage = ''

  getis_admin() {
    return this.is_admin
  }

  setis_admin(is_admin: string) {
    this.is_admin = is_admin
  }

  getfullname() {
    return this.fullname
  }

  setfullname(fullname: string) {
    this.fullname = fullname
  }

  // getmessage() {
  //   return this.registermessage
  // }

  // setmessage(registermessage: string) {
  //   this.registermessage = registermessage
  // }

  getauthStatus(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn)
      }, 10)
    })
    return promise;
  }
  getregisterStatus(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isRegistered)
      }, 10)
    })
    return promise;
  }


  register() {
    this.isRegistered = true
    // alert(this.registermessage + '. Welcome' + this.fullname + '.')
    alert('Registration is Successful. Welcome ' + this.fullname + '.');
    this.router.navigate(['/login'])

  }

  login() {
    this.isLoggedIn = true
    alert('Log In Successful. Welcome ' + this.fullname + '.');
    this.router.navigate([''])

  }
  logout() {
    this.isLoggedIn = false
    this.router.navigate(['/login'])
  }
}
