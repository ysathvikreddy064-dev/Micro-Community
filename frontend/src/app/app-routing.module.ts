import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SubmitIssueComponent } from './pages/submit-issue/submit-issue.component';
import { MyIssuesComponent } from './pages/my-issues/my-issues.component';
import { IssueDetailsComponent } from './pages/issue-details/issue-details.component';
import { MapComponent } from './pages/map/map.component';
import { AdminLoginComponent } from './pages/admin/login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { AdminIssuesTableComponent } from './pages/admin/issues-table/issues-table.component';
import { AdminIssueDetailsComponent } from './pages/admin/issue-details/admin-issue-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'submit', component: SubmitIssueComponent },
  { path: 'my-issues', component: MyIssuesComponent },
  { path: 'issue/:id', component: IssueDetailsComponent },

  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/issues', component: AdminIssuesTableComponent },
  { path: 'admin/issue/:id', component: AdminIssueDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
