import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GridResponse } from './../../shared/components/grid/grid';
import { User } from './../models/User.model';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/user/${id}`);
  }

  post(user: User): Observable<any> {
    return this.apiService.post(`/user`, user);
  }

  put(id: number, user: User): Observable<any> {
    return this.apiService.put(`/user/${id}`, user);
  }

  query(params?: HttpParams): Observable<GridResponse> {
    return this.apiService.get(`/user`, params);
  }
}
