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

  add(name : string) : void {
    name = name.trim();
    if(!name) return;
    this.studentService.addStudent({name} as Student).subscribe(
      student => this.students.push(student)
    );
  }

  delete(student : Student) : void {
    this.students = this.students.filter(s => s._id !== student._id);
    this.studentService.deleteStudent(student).subscribe();
  }

}
