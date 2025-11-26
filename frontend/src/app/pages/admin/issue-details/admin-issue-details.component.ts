import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  selector: 'app-admin-issue-details',
  templateUrl: './admin-issue-details.component.html',
  styleUrls: ['./admin-issue-details.component.css']
})
export class AdminIssueDetailsComponent implements OnInit {

  issue: any;
  newStatus = 'IN_PROGRESS';
  assignedDepartment = '';
  note = '';
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.issueService.get(this.id).subscribe(res => {
      this.issue = res.data;
    });
  }

  update() {
    this.issueService.updateStatus(this.id, {
      status: this.newStatus,
      note: this.note,
      assignedDepartment: this.assignedDepartment
    }).subscribe(res => {
      this.issue = res.data;
      alert('Updated');
    });
  }
}
