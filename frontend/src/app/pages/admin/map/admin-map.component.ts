import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit {

  issues: any[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.allAdmin(0, 100)
      .subscribe(res => this.issues = res.data.content);
  }
}
