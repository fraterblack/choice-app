import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GridResponse } from './../../shared/components/grid/grid';
import { ApiService } from './api.service';
import { Service } from './service';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/table/${id}`);
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
