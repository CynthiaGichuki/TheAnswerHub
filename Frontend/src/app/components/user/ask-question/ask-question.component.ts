import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addQuestion } from '../../../state/Actions/question.action';
import { AppState } from '../../../state/app.state';


@Component({
  selector: 'app-ask-question',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  form!: FormGroup

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required])

    })
  }

  submitData(): void {
    const question = {
      ...this.form.value,
      createdDate: new Date(),
    };
    this.store.dispatch(addQuestion({ question }));
    this.form.reset();
  }
}
