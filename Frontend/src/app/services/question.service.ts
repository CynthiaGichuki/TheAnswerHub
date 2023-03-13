import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'https://example.com/api/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.baseUrl, question);
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/${question.id}`, question);
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.baseUrl, question);
  }
}
