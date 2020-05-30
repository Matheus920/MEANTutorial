import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students : Student[];
  selectedStudent : Student;
  
  constructor(private studentService : StudentService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() : void {
   this.studentService.getStudents().subscribe(
     students => this.students = students
   );
  }

}
