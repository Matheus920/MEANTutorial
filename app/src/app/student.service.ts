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

  private studentsURL = api + 'api/students';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService : MessageService,
    private httpClient : HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.studentsURL).pipe(
      tap(_ => this.log('Students succesfully fetched!')),
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  };

  addStudent(student : Student) : Observable<Student> {
    return this.httpClient.post<Student>(this.studentsURL, student, this.httpOptions).pipe(
      tap((newStudent : Student) => this.log(`added student id=${newStudent._id}`)),
      catchError(this.handleError<Student>(`postStudent name = ${student.name}`))
    );
  }

  deleteStudent(student : Student) : Observable<Student> {
    const url : string = `${this.studentsURL}/${student._id}`;
    return this.httpClient.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted student id = ${student._id}`)),
      catchError(this.handleError<Student>(`delete student id = ${student._id}`)
    ));
  }

  updateStudent(student : Student) : Observable<Student> {
    const url : string = `${this.studentsURL}/${student._id}`;
    return this.httpClient.patch<Student>(url, student, this.httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student._id}`),
      catchError(this.handleError<Student>(`updateStudent id = ${student._id}`))
    ));
  }

  getStudent(id : string) : Observable<Student> {
    const url : string = `${this.studentsURL}/${id}`;
    return this.httpClient.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`),
      catchError(this.handleError<Student>(`getStudent id = ${id}`))
    ));
  }

  searchStudent(term : string) : Observable<Student[]>{
    if(!term.trim()){
      return of([]);
    }
    const url : string = `${this.studentsURL}/search/${term}`;
    return this.httpClient.get<Student[]>(url).pipe(
      tap(x => x.length ? this.log(`found students matching ${term}`) :
        this.log(`no students matching ${term}`)),
      catchError(this.handleError<Student[]>('searchStudents', []))
    )
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
