import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Answer, Question } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-single-question',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {
  showInput?: boolean;
  // faThumbsDown = faThumbsDown;
  // faThumbsUp = faThumbsUp;

  question: Question | undefined

  answers: Answer[] = []

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.store.select('questions').subscribe(questions => {
    //   this.question = questions.questions.find((question: Question) => question.questionID === params['id'])
    //   console.log("question", this.question);
    //   },
    //     (error: any) => {
    //       console.log(error);
    //     }
    //   );
    //   console.log('console works')
    // });

    // this.route.params.subscribe(params => {
    //   this.store.select(selectAnswers).subscribe(answers => {
    //     this.answers = answers.filter((answer: Answer) => answer.questionID === params['id'])
    //     console.log("Answers:", this.answers)
    //   })
    // })
    
    

  }


}
