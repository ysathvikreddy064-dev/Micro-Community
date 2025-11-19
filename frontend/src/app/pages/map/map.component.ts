import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';

@Component({
  template: `
  <google-map height=\"80vh\" width=\"100%\" [center]=\"center\" [zoom]=\"12\">
    <map-marker *ngFor=\"let i of issues\" [position]=\"{lat:i.latitude,lng:i.longitude}\" [title]=\"i.title\"></map-marker>
  </google-map>
  `
})
export class MapComponent implements OnInit {
  center = { lat: 39.2673, lng: -76.7983 };
  issues:any[]=[];
  constructor(private issueService: IssueService) {}
  ngOnInit(){ this.issueService.resolved().subscribe(res => this.issues = res.data.content); }
}
