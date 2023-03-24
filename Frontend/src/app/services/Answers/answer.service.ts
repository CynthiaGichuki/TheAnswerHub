import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private baseUrl = 'http://localhost:4003/answers';
  
  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`http://localhost:4003/answers`);
  }

  getAnswerById(answerID: string): Observable<Answer> {
    return this.http.get<Answer>(`http://localhost:4003/answers/${answerID}`);
  }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`http://localhost:4003/answers/addAnswer`, answer);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(`http://localhost:4003/answers/${answer.answerID}`, answer);
  }

  deleteAnswer(answerID: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${answerID}`);
  }

}
