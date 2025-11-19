import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';

@Component({
  template: `
  <mat-card>
    <h2>Submit issue</h2>
    <form (ngSubmit)=\"submit()\">
      <mat-form-field class=\"full\"><input matInput placeholder=\"Title\" [(ngModel)]=\"title\" name=\"title\"></mat-input></mat-form-field>
      <mat-form-field class=\"full\"><textarea matInput placeholder=\"Description\" [(ngModel)]=\"description\" name=\"description\"></textarea></mat-form-field>
      <mat-form-field class=\"full\">
        <mat-select placeholder=\"Category\" [(ngModel)]=\"categoryId\" name=\"categoryId\">
          <mat-option *ngFor=\"let c of categories\" [value]=\"c.id\">{{c.name}}</mat-option>
        </mat-select>
      </mat-form-field>
      <div style=\"height:300px\">
        <google-map height=\"300px\" width=\"100%\" [center]=\"center\" [zoom]=\"13\" (mapClick)=\"setMarker($event)\">
          <map-marker *ngIf=\"marker\" [position]=\"marker\"></map-marker>
        </google-map>
      </div>
      <input type=\"file\" multiple (change)=\"filesChanged($event)\">
      <button mat-raised-button color=\"primary\">Submit</button>
    </form>
  </mat-card>
  `,
  styles:[`.full{width:100%}`]
})
export class SubmitIssueComponent implements OnInit {
  categories:any[]=[]; title=''; description=''; categoryId:number|undefined;
  center = { lat: 39.2673, lng: -76.7983 };
  marker: {lat:number, lng:number} | null = null;
  images: File[] = [];
  constructor(private issueService: IssueService) {}
  ngOnInit(){ this.issueService.categories().subscribe(res => this.categories = res.data); }
  setMarker(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng!;
    this.marker = { lat: latLng.lat(), lng: latLng.lng() };
  }
  filesChanged(e:any){ this.images = Array.from(e.target.files); }
  submit(){
    if(!this.marker || !this.categoryId) return;
    const payload = {
      title: this.title, description: this.description, categoryId: this.categoryId,
      latitude: this.marker.lat, longitude: this.marker.lng
    };
    this.issueService.submit(payload, this.images).subscribe(()=> alert('Submitted'));
  }
}
