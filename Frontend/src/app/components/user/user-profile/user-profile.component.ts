import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { Question } from '../../../interfaces/interfaces';
import { updateQuestion, deleteQuestion } from '../../../state/Actions/question.action';
import { selectUserQuestions } from '../../../state/Selectors/question.selector';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  userId?: string;
  userQuestions$?: Observable<Question[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userId = String(this.route.snapshot.paramMap.get('userId'));
    this.userQuestions$ = this.store.select(selectUserQuestions, (this.userId));

    // this.userId = String(this.route.snapshot.paramMap.get('userId'));
    // this.userQuestions$ = this.store.select(selectUserQuestions, { userId: this.userId });
  }

  onUpdateQuestion(question: Question): void {
    this.store.dispatch(updateQuestion({ question }));
  }

  onDeleteQuestion(questionID: string): void {
    this.store.dispatch(deleteQuestion({ questionID }));
  }
}