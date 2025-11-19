import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../../core/services/issue.service';

@Component({
  template: `
  <mat-card *ngIf=\"issue\">
    <h2>{{issue.title}}</h2>
    <p>{{issue.description}}</p>
    <p><b>Category:</b> {{issue.categoryName}} | <b>Status:</b> {{issue.status}}</p>
    <div style=\"height:300px\">
      <google-map [center]=\"{lat:issue.latitude, lng:issue.longitude}\" [zoom]=\"15\">
        <map-marker [position]=\"{lat:issue.latitude, lng:issue.longitude}\"></map-marker>
      </google-map>
    </div>
    <div *ngIf=\"issue.imageUrls?.length\">
      <h3>Images</h3>
      <img *ngFor=\"let url of issue.imageUrls\" [src]=\"url\" style=\"max-width:200px;margin-right:8px\">
    </div>
  </mat-card>
  `
})
export class IssueDetailsComponent implements OnInit {
  issue:any;
  constructor(private route: ActivatedRoute, private issueService: IssueService) {}
  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.issueService.get(id).subscribe(res => this.issue = res.data);
  }
}
