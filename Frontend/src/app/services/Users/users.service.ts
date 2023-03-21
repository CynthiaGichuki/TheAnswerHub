import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, registerSuccess, loginSuccess } from '../../interfaces/interfaces';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  Users: User[] = []


  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<registerSuccess> {
    return this.http.post<registerSuccess>(`http://localhost:4003/users/register`, user);
  }

  login(loguser: { email: string, password: string }): Observable<loginSuccess> {
    return this.http.post<loginSuccess>('http://localhost:4003/users/login', loguser);

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4003/users')

  }
}


