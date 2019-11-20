import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends Service {
  constructor(private apiService: ApiService) {
    super();
  }

  get(tableId: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('expand', 'table');

    return this.apiService.get(`/attendance/${tableId}`, params);
  }

  setOptionStatus(tableId: string, optionId: number, serviceId: number, isAvailable: boolean) {
    return this.apiService.post(`/attendance/${tableId}/product-decline`, {
      product: {
        id: optionId
      },
      service: {
        id: serviceId
      },
      isAvailable
    });
  }
}
