import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, logUser } from '../interfaces/interfaces';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  Users: User[] = []


  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:4002/users/register`, user);
  }

  login(loguser: { email: string, password: string }): Observable<logUser> {
    return this.http.post<logUser>('http://localhost:4000/users/login', loguser);

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4000/users')

  }
}


