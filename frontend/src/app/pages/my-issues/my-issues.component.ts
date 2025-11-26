import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';

@Component({
  selector: 'app-my-issues',
  templateUrl: './my-issues.component.html',
  styleUrls: ['./my-issues.component.css']
})
export class MyIssuesComponent implements OnInit {

  issues: any[] = [];
  cols = ['title', 'status', 'category'];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.my().subscribe(res => {
      this.issues = res.data.content;
    });
  }

  open(id: number) {
    location.href = '/issue/' + id;
  }
}
