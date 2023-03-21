import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:4003/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:4003/questions`);
  }

  getQuestionById(questionID: string): Observable<Question> {
    return this.http.get<Question>(`http://localhost:4003/questions/${questionID}`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`http://localhost:4003/questions/addQuestion`, question);
  }

  // createQuestion(addQuestion: Question): Observable<Question> {
  //   return this.http.post<Question>(this.baseUrl, addQuestion);
  // }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`http://localhost:4003/questions/${question.questionID}`, question);
  }

  deleteQuestion(questionID: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${questionID}`);
  }

}
