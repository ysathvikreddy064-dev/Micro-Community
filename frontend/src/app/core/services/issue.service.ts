import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private base = `${environment.apiBaseUrl}/issues`;
  constructor(private http: HttpClient) {}

  categories() { return this.http.get<any>(`${this.base}/categories`); }

  submit(payload: any, images: File[]) {
    const form = new FormData();
    form.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    images.forEach(f => form.append('images', f));
    return this.http.post<any>(`${this.base}`, form);
  }

  my(page=0,size=10) {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.base}/me`, { params });
  }

  allAdmin(page=0,size=10, categoryId?: number, status?: string) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (categoryId) params = params.set('categoryId', categoryId);
    if (status) params = params.set('status', status);
    return this.http.get<any>(`${this.base}/admin`, { params });
  }

  resolved(page=0,size=10) {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.base}/public/resolved`, { params });
  }

  get(id: number) { return this.http.get<any>(`${this.base}/${id}`); }
  history(id: number) { return this.http.get<any>(`${this.base}/${id}/history`); }
  updateStatus(id: number, body: any) { return this.http.put<any>(`${this.base}/${id}/status`, body); }
}
