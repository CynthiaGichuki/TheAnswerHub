import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from 'src/app/services/Users/users.service';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { Store } from '@ngrx/store';
import { register } from 'src/app/state/Actions/register.action';
import { selectRegisterUserStateError, selectRegisterUserStateloading } from 'src/app/state/Selectors/register.selector';
import { selectLoggedInUser } from 'src/app/state/Selectors/login.selector';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = { userID: '', fullname: '', email: '', username: '', password: '' };
  error = '';
  form!: FormGroup
  isLoading = true

  constructor(private router: Router, private userService: UsersService, private auth: AuthService, private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      fullname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])

    })
  }

  submitData(): void {

    const { fullname, email, username, password } = this.form.value
    const formData: User = { fullname, username, email, password }
    this.store.dispatch(register({ user: formData }))

    this.store.select(selectRegisterUserStateloading).subscribe((loading) => {
      this.isLoading = loading
    })

    this.store.select(selectLoggedInUser).subscribe((user: any) => {
      if (user) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["/"]);
          }
          );
    }

  })

    this.store.select(selectRegisterUserStateError).subscribe((error) => {
      if (error) {
        console.log(error.message);
        return
      }
    })

    // this.userService.register(this.form.value).subscribe(response => {

    //   console.log(response);
    //   this.auth.setfullname(response.fullname)
    //   this.auth.register()
    //   localStorage.setItem('token', response.token)

    // })
  }

}

