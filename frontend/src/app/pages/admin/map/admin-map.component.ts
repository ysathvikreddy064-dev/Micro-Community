import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  template: `
    <div style="height:80vh; background:#eee; display:flex; align-items:center; justify-content:center;">
      <p>Admin map disabled</p>
    </div>
  `
})
export class AdminMapComponent implements OnInit {
  center = { lat: 39.2673, lng: -76.7983 };
  issues: any[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.allAdmin(0,100).subscribe({
      next: res => this.issues = res?.data?.content ?? [],
      error: err => {
        console.error('Admin map load failed:', err);
        this.issues = [];
      }
    });
  }
}
