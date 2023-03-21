import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addQuestion } from '../../../state/Actions/question.action';
import { AppState } from '../../../state/app.state';
import { QuestionService } from 'src/app/services/Question/question.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ask-question',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  form!: FormGroup

  constructor(private store: Store<AppState>, private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required])

    })
  }

  submitData(): void {
    // const question = {
    //   ...this.form.value,
    //   createdDate: new Date(),
    // };
    // this.store.dispatch(addQuestion({ question }));
    // console.log(question);

    this.questionService.addQuestion(this.form.value).subscribe(response => {

      console.log(response);
      this.router.navigate(['']);

    })

    // this.form.reset();
  }
}
