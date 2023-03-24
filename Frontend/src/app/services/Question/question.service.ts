import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Question, questionVoteCount } from '../../interfaces/interfaces';

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

  getQuestionVoteCount(questionID: string): Observable<questionVoteCount>{
    return this.http.get<questionVoteCount>(`http://localhost:4003/questions/voteCount/${questionID}`)
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
