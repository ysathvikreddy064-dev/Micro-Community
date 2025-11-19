import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  template: `
  <mat-card *ngIf=\"issue\">
    <h2>{{issue.title}}</h2>
    <p>{{issue.description}}</p>
    <p><b>Status:</b> {{issue.status}}</p>
    <mat-form-field>
      <mat-select placeholder=\"New status\" [(ngModel)]=\"newStatus\">
        <mat-option value=\"OPEN\">Open</mat-option>
        <mat-option value=\"IN_PROGRESS\">In Progress</mat-option>
        <mat-option value=\"RESOLVED\">Resolved</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field class=\"full\">
      <input matInput placeholder=\"Assigned department\" [(ngModel)]=\"assignedDepartment\">
    </mat-form-field>
    <mat-form-field class=\"full\">
      <input matInput placeholder=\"Note\" [(ngModel)]=\"note\">
    </mat-form-field>
    <button mat-raised-button color=\"primary\" (click)=\"update()\">Update</button>
  </mat-card>
  `
})
export class AdminIssueDetailsComponent implements OnInit {
  issue:any; newStatus='IN_PROGRESS'; assignedDepartment=''; note='';
  id!: number;
  constructor(private route: ActivatedRoute, private issueService: IssueService) {}
  ngOnInit(){ this.id = Number(this.route.snapshot.paramMap.get('id')); this.issueService.get(this.id).subscribe(res => this.issue = res.data); }
  update(){
    this.issueService.updateStatus(this.id, { status:this.newStatus, note:this.note, assignedDepartment:this.assignedDepartment })
      .subscribe(res => { this.issue = res.data; alert('Updated'); });
  }
}
