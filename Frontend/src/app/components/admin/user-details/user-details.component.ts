import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/Users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Store } from '@ngrx/store';
import { deleteUser, loadUsers } from 'src/app/state/Actions/users.actions';
import { selectUserById, selectUsers } from 'src/app/state/Selectors/users.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, SideBarComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  users: User[] = []
  selectedUser$: Observable<User | undefined> = new Observable<User | undefined>();

  constructor(private store: Store) { }

  ngOnInit() {

    this.store.dispatch(loadUsers())
    this.store.select(selectUsers).subscribe(users => {
      this.users = users as User[]
      console.log(this.users);

    })
  }
  
  selectUser(userID: string) {
    this.selectedUser$ = this.store.select(selectUserById(userID));
  }

  disable(userID: string) {
    this.store.dispatch(deleteUser({ userID }));
  }
}


