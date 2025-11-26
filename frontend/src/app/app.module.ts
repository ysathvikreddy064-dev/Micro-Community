import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
//import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
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
import { AdminMapComponent } from './pages/admin/map/admin-map.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, LoginComponent, RegisterComponent, SubmitIssueComponent,
    MyIssuesComponent, IssueDetailsComponent, MapComponent,
    AdminLoginComponent, AdminDashboardComponent, AdminIssuesTableComponent,
    AdminIssueDetailsComponent, AdminMapComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    AppRoutingModule, MatToolbarModule, MatButtonModule, MatInputModule, MatCardModule,
    MatSelectModule, MatTableModule, MatIconModule, MatPaginatorModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
