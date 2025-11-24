import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';

@Component({
  template: `
    <div style="height:80vh; background:#eee; display:flex; align-items:center; justify-content:center;">
      <p>Map disabled in production</p>
    </div>
  `
})
export class MapComponent implements OnInit {
  center = { lat: 39.2673, lng: -76.7983 };
  issues:any[]=[];
  constructor(private issueService: IssueService) {}
  ngOnInit(){ this.issueService.resolved().subscribe(res => this.issues = res.data.content); }
}
