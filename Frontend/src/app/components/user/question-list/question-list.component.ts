import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Answer, Question } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { getQuestion, loadQuestions } from '../../../state/Actions/question.action';
import { selectAllQuestions, selectQuestionById } from '../../../state/Selectors/question.selector';
import { HeaderComponent } from '../header/header.component';
import { loadAnswers } from 'src/app/state/Actions/answer.actions';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  allQuestions: Question[] = []

  question: Question | undefined

  answers: Answer[] = []

  // question$ = this.store.pipe(select(selectQuestionById('123')));

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.store.dispatch(loadQuestions())

    this.store.select(selectAllQuestions).subscribe(questions => {
      this.allQuestions = questions as Question[]
      console.log(this.allQuestions);

    })


  }

  viewQuestion() {

    // this.route.params.subscribe(params => {
    //   const questionId = params['questionID'];
    //   this.store.select(selectQuestionById(questionId)).subscribe(question => {
    //     if (question) {
    //       this.question = question;
    //       this.router.navigate(['/viewquestion'])
    //     }
    //   });
    // });
    this.route.params.subscribe(params => {
      this.store.select(selectQuestionById(params['questionId'])).subscribe(question => {
        this.question = question;
        console.log("question", this.question);
        this.router.navigate(['/viewquestion'])
      },
        (error: any) => {
          console.log(error);
        }
      );
      console.log('console works')
    });
  }
  viewAnswers() {
    this.store.dispatch(loadAnswers())
  }

}


