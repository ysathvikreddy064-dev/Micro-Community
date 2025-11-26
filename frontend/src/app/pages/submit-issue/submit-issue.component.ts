import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';

@Component({
  selector: 'app-submit-issue',
  templateUrl: './submit-issue.component.html',
  styleUrls: ['./submit-issue.component.css']
})
export class SubmitIssueComponent implements OnInit {

  categories: any[] = [];
  title = '';
  description = '';
  categoryId?: number;
  images: File[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.categories().subscribe(res => {
      this.categories = res.data;
    });
  }

  filesChanged(e: any) {
    this.images = Array.from(e.target.files);
  }

  submit() {
    if (!this.categoryId) return;

    const payload = {
      title: this.title,
      description: this.description,
      categoryId: this.categoryId
    };

    this.issueService.submit(payload, this.images)
      .subscribe(() => alert('Submitted'));
  }
}
