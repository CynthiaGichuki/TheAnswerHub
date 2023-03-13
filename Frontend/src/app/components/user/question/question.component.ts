import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../state/app.state';
import { RouterModule } from '@angular/router';
import { AskQuestionComponent } from '../ask-question/ask-question.component';
import {
  addQuestion,
  deleteQuestion,
  loadQuestions,
  updateQuestion
} from '../../../state/Actions/question.action';
import {
  selectAllQuestions,
  selectQuestionError,
  selectQuestionLoading
} from '../../../state/Selectors/question.selector';
import { Question } from 'src/app/interfaces/interfaces';
import { QuestionListComponent } from '../question-list/question-list.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, AskQuestionComponent, QuestionListComponent],
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  questions$: Observable<Question[]> = new Observable<Question[]>();
  isLoading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<string> = new Observable<string>();

  ngOnInit() {
    this.store.dispatch(loadQuestions());
    this.questions$ = this.store.select(selectAllQuestions);
    this.isLoading$ = this.store.select(selectQuestionLoading);
    this.error$ = this.store.select(selectQuestionError);
  }

  onAddQuestion(question: Question) {
    this.store.dispatch(addQuestion({ question }));
  }

  onUpdateQuestion(question: Question) {
    this.store.dispatch(updateQuestion({ question }));
  }

  onDeleteQuestion(id: string) {
    this.store.dispatch(deleteQuestion({ id: String(id) }));
  }
}
