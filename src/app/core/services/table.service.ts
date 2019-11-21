import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Table } from '../models/table.model';
import { GridResponse } from './../../shared/components/grid/grid';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class TableService extends Service {

  constructor(private apiService: ApiService, private http: HttpClient) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/table/${id}`);
  }

  getQrCode(id: number): Observable<any> {
    return this.http.get(
      `${environment.api_url}/qrcode/${id}`, { responseType: 'blob' });
  }

  post(table: Table): Observable<any> {
    return this.apiService.post(`/table`, table);
  }

  put(id: number, table: Table): Observable<any> {
    return this.apiService.put(`/table/${id}`, table);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/table/${id}`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/table`, params);
  }
}
