import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from './student';
import { STUDENTS } from './mock-students';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../config';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsURL = api + 'api/students'

  constructor(private messageService : MessageService,
    private httpClient : HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.studentsURL).pipe(
      tap(_ => this.log('Students succesfully fetched!')),
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  };

  getStudent(id : string) : Observable<Student> {
    const url : string = `${this.studentsURL}/${id}`;
    return this.httpClient.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`),
      catchError(this.handleError<Student>(`getStudent id = ${id}`))
    ));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
