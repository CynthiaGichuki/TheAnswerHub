import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/state/Selectors/login.selector';
import { logout } from 'src/app/state/Actions/login.actions';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(protected store: Store, private router: Router) {

  }

  isLoggedIn$ = this.store.select(selectLoggedInUser);

  logout() {
    this.store.dispatch(logout());
    this.router.navigate([''])
  }


}
