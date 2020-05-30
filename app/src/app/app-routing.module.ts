import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';


const routes: Routes = [{
  path: 'students', component: StudentsComponent
}, {
  path: 'dashboard', component: DashboardComponent
},
{
  path: '', redirectTo: '/dashboard', pathMatch: 'full'
},
{
  path: 'students/:id', component: StudentDetailComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
