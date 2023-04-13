import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Question } from 'src/app/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getQuestionVoteCount, loadQuestions } from 'src/app/state/Actions/question.action';
import { selectAllQuestions } from 'src/app/state/Selectors/question.selector';

@Component({
  selector: 'app-question-details',
  standalone: true,
  imports: [CommonModule, SideBarComponent],
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent {


  allQuestions: Question[] = []

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadQuestions())

    this.store.select(selectAllQuestions).subscribe(questions => {
      this.allQuestions = questions as Question[]
      console.log(this.allQuestions);

    })

    
      // this.store.dispatch(getQuestionVoteCount());
    
  }
  deleteQuestion(questionToDelete: Question): void {
    this.allQuestions = this.allQuestions.filter(question => question !== questionToDelete);
    alert("Question has been deleted successfully")
  }


}
