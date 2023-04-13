import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { loadQuestions } from 'src/app/state/Actions/question.action';
import { selectAllQuestions } from 'src/app/state/Selectors/question.selector';
import { Question } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
    imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent]
})
export class HomepageComponent implements OnInit {

    allQuestions: Question[] = []

    constructor(private store: Store) {

    }
    ngOnInit(): void {
        this.store.dispatch(loadQuestions())

        this.store.select(selectAllQuestions).subscribe(questions => {
            this.allQuestions = questions as Question[]
            console.log(this.allQuestions);

        })
    }

}
