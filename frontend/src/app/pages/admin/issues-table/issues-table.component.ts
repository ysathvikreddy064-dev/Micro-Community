import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  selector: 'app-admin-issues-table',
  templateUrl: './admin-issues-table.component.html',
  styleUrls: ['./admin-issues-table.component.css']
})
export class AdminIssuesTableComponent implements OnInit {

  issues: any[] = [];
  cols = ['title', 'status', 'category', 'actions'];
  status = '';

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.issueService.allAdmin(0, 50, undefined, this.status || undefined)
      .subscribe(res => this.issues = res.data.content);
  }

  open(id: number) {
    location.href = '/admin/issue/' + id;
  }
}
