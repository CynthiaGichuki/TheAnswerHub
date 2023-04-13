import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as QuestionsActions from '../../../state/Actions/question.action';
import { AppState } from '../../../state/app.state';
import { QuestionService } from 'src/app/services/Question/question.service';
import { Router } from '@angular/router';
import { Question } from 'src/app/interfaces/interfaces';
import { selectLoggedInUser } from 'src/app/state/Selectors/login.selector';
import { addQuestion } from '../../../state/Actions/question.action';


@Component({
  selector: 'app-ask-question',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  form!: FormGroup

  constructor(private store: Store<AppState>, private questionService: QuestionService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required])

    })
   }

  ngOnInit(): void {
    const user = this.store.select(selectLoggedInUser).subscribe((user: any) => {
      // console.log(user?.user[0].userId)
    })
    
  }


  submitData(form: FormGroup) {
    console.log(form.value);

    this.store.dispatch(addQuestion({
      ...form.value
    }));

    this.router.navigate(["allQuestions"]);
  }
}
