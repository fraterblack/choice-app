import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Services } from '../models/services.model';
import { GridResponse } from './../../shared/components/grid/grid';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/service/${id}`);
  }

  post(service: Services): Observable<any> {
    return this.apiService.post(`/service`, service);
  }

  put(id: number, service: Services): Observable<any> {
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
