import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Option } from '../models/option.model';
import { QueryResponse } from './../../shared/common';
import { GridResponse } from './../../shared/components/grid/grid';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class OptionService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/product/${id}`);
  }

  post(option: Option): Observable<any> {
    return this.apiService.post(`/product`, option);
  }

  put(id: number, option: Option): Observable<any> {
    return this.apiService.put(`/product/${id}`, option);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/product/${id}`);
  }

  index(): Observable<any> {
    return this.apiService.get(`/product`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/product`, params);
  }

  getSuggestions(keyword?: string): Observable<QueryResponse> {
    const obj: any = {
      sort: 'name',
      order: 'asc',
      page: 1,
      limit: 30,
      search: keyword
    };

    const params = new HttpParams({
      fromObject: obj
    });

    return this.apiService.get(`/product-mining`, params);
  }
}
