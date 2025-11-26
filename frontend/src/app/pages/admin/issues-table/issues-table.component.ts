import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  template: `
  <mat-card>
    <h2>All Issues</h2>
    <mat-form-field>
      <mat-select placeholder=\"Filter status\" [(ngModel)]=\"status\">
        <mat-option [value]=\"''\">All</mat-option>
        <mat-option value=\"OPEN\">Open</mat-option>
        <mat-option value=\"IN_PROGRESS\">In Progress</mat-option>
        <mat-option value=\"RESOLVED\">Resolved</mat-option>
      </mat-select>
    </mat-form-field>
    <button mat-button (click)=\"load()\">Apply</button>

    <table mat-table [dataSource]=\"issues\">
      <ng-container matColumnDef=\"title\"><th mat-header-cell *matHeaderCellDef>Title</th><td mat-cell *matCellDef=\"let i\">{{i.title}}</td></ng-container>
      <ng-container matColumnDef=\"status\"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef=\"let i\">{{i.status}}</td></ng-container>
      <ng-container matColumnDef=\"category\"><th mat-header-cell *matHeaderCellDef>Category</th><td mat-cell *matCellDef=\"let i\">{{i.categoryName}}</td></ng-container>
      <ng-container matColumnDef=\"actions\"><th mat-header-cell *matHeaderCellDef>Actions</th><td mat-cell *matCellDef=\"let i\"><button mat-button color=\"primary\" (click)=\"open(i.id)\">Open</button></td></ng-container>
      <tr mat-header-row *matHeaderRowDef=\"cols\"></tr>
      <tr mat-row *matRowDef=\"let row; columns: cols;\"></tr>
    </table>
  </mat-card>
  `
})
export class AdminIssuesTableComponent implements OnInit {
  issues:any[]=[]; cols=['title','status','category','actions']; status='';
  constructor(private issueService: IssueService) {}
  ngOnInit(){ this.load(); }
  load(){ this.issueService.allAdmin(0,50, undefined, this.status || undefined).subscribe(res => this.issues = res.data.content); }
  open(id:number){ location.href = '/admin/issue/'+id; }
}
