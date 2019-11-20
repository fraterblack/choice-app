import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Service } from '../models/service.model';
import { GridResponse } from './../../shared/components/grid/grid';
import { ApiService } from './api.service';
import { Service as BaseService } from './service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/service/${id}`);
  }

  post(service: Service): Observable<any> {
    return this.apiService.post(`/service`, service);
  }

  put(id: number, service: Service): Observable<any> {
    return this.apiService.put(`/service/${id}`, service);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/service/${id}`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/service`, params);
  }
}
