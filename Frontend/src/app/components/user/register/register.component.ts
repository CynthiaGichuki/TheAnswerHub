import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from 'src/app/services/Users/users.service';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = { userId: '', fullname: '', email: '', username: '', password: '' };
  // error = '';
  form!: FormGroup

  constructor(private router: Router, private userService: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      fullname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])

    })
  }

  submitData(): void {
    // console.log(this.form.value);
    this.userService.register(this.form.value).subscribe(response => {

      console.log(response);
      this.auth.setfullname(response.fullname)
      this.auth.register()
      localStorage.setItem('token', response.token)
    
    })
  }

}


