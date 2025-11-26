import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  issues: any[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.resolved().subscribe(res => {
      this.issues = res.data.content;
    });
  }
}
