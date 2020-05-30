import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  @Input() student: Student;

  constructor(
    private studentService : StudentService,
    private location : Location,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero() : void {
    const id = this.route.snapshot.paramMap.get("id");
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }

  goBack() : void {
    this.location.back();
  }

}
