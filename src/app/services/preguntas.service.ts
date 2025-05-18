import { Injectable } from '@angular/core';
import { Pregunta } from '../models/';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PreguntasService {


  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>('assets/data/trivia-questions.json');
  }
}
