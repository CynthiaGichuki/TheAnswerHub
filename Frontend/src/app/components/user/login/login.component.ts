import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from 'src/app/services/Users/users.service';
import { logUser } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import * as loggedInUserActions from '../../../state/Actions/login.actions';
import { login } from 'src/app/state/Actions/login.actions';
import { selectLoggedInUser, selectLoggedInUserError, selectLoggedInUserLoading } from 'src/app/state/Selectors/login.selector';
// import { login } from 'src/app/state/Actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: logUser = { email: '', password: '' };
  error = '';
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(private router: Router, private userService: UsersService, private auth: AuthService, private store: Store) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])

    })
  }

  ngOnInit(): void {

    this.store.select(selectLoggedInUserLoading).subscribe((loading) => {
      this.isLoading = loading;
    }
    )
  }


  submitData(form: FormGroup) {
    if (form && form.invalid) {
      return
    } else {
      // console.log(form.value)
      this.store.dispatch(login({ user: form.value }));
      this.store.select(selectLoggedInUserLoading).subscribe((loading) => {
        this.isLoading = loading;
      })
      this.store.select(selectLoggedInUserError).subscribe((error) => {
        this.error = error;
      })
    }

    this.store.select(selectLoggedInUser).subscribe((user: any) => {
      if (user && user.is_admin) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          alert('Login is Successful. Welcome Admin ' + user.fullname + '.');
          this.router.navigate(["/admin"]);
        });
      } else if (user) {
        alert('Login is Successful. Welcome ' + user.fullname + '.');
        this.router.navigate(['']);
      }
    });


  }



  // this.userService.login(this.form.value).subscribe(response => {
  //   console.log(response);
  //   this.auth.setis_admin(response.is_admin)
  //   this.auth.setfullname(response.fullname)
  //   this.auth.login()
  //   localStorage.setItem('token', response.token)

  //   if (response.token) {
  //     if (response.is_admin) {
  //       alert('Log In Successful. Welcome Admin ' + response.fullname + '.');
  //       this.router.navigate(['/admin']);
  //     } else {
  //       alert('Log In Successful. Welcome ' + response.fullname + '.');
  //       this.router.navigate(['']);
  //     }
  //   } else {
  //     alert('Login unsuccessful. Please check your username and password.');
  //   }
  // })

}





