import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Question } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { loadQuestions } from '../../../state/Actions/question.action';
import { selectAllQuestions } from '../../../state/Selectors/question.selector';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions$?: Observable<Question[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
    this.questions$ = this.store.select(selectAllQuestions);
  }
}


