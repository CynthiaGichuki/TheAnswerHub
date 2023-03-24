import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, loggedInUser, registerUserSuccess, Message } from '../../interfaces/interfaces';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  Users: User[] = []


  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<registerUserSuccess> {
    return this.http.post<registerUserSuccess>(`http://localhost:4003/users/register`, user);
  }

  login(loguser: { email: string, password: string }): Observable<loggedInUser> {
    return this.http.post<loggedInUser>('http://localhost:4003/users/login', loguser);

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4003/users')
  }

  deleteUser(userID: string): Observable<Message> {
    return this.http.delete<Message>(`http://localhost:4003/users/${userID}`);
  }
}


