import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';

@Component({
  template: `
  <mat-card>
    <h2>My issues</h2>
    <table mat-table [dataSource]=\"issues\">
      <ng-container matColumnDef=\"title\"><th mat-header-cell *matHeaderCellDef>Title</th><td mat-cell *matCellDef=\"let i\">{{i.title}}</td></ng-container>
      <ng-container matColumnDef=\"status\"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef=\"let i\">{{i.status}}</td></ng-container>
      <ng-container matColumnDef=\"category\"><th mat-header-cell *matHeaderCellDef>Category</th><td mat-cell *matCellDef=\"let i\">{{i.categoryName}}</td></ng-container>
      <tr mat-header-row *matHeaderRowDef=\"cols\"></tr>
      <tr mat-row *matRowDef=\"let row; columns: cols;\" (click)=\"open(row.id)\" style=\"cursor:pointer\"></tr>
    </table>
  </mat-card>
  `
})
export class MyIssuesComponent implements OnInit {
  issues:any[]=[]; cols=['title','status','category'];
  constructor(private issueService: IssueService) {}
  ngOnInit(){ this.issueService.my().subscribe(res => this.issues = res.data.content); }
  open(id:number){ location.href = '/issue/'+id; }
}
