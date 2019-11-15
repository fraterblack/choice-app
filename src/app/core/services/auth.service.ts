import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { shareReplay, tap } from 'rxjs/operators';

import { ApiService } from './api.service';

export enum SessionName {
  ID = 'id',
  NAME = 'name',
  TOKEN = 'token',
  EXPIRE_AT = 'expires_at'
}

export interface JWTPayload {
  id: number;
  name: string;
  email: string;
  id_company: number;
  issued_at: number;
  expire_at: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  /**
   * Login user
   * @param email User email
   * @param password User password
   */
  login(email: string, password: string) {
    return this.apiService.post('/signin', { email, password })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem(SessionName.TOKEN);
    localStorage.removeItem(SessionName.ID);
    localStorage.removeItem(SessionName.NAME);
    localStorage.removeItem(SessionName.EXPIRE_AT);
  }

  /**
   * Get active token
   *
   * @returns string
   */
  getToken(): string {
    return localStorage.getItem(SessionName.TOKEN);
  }

  /**
   * Get active token
   *
   * @returns string
   */
  getUserId(): number {
    return Number.parseInt(localStorage.getItem(SessionName.ID), 0);
  }

  /**
   * Get active token
   *
   * @returns string
   */
  getUsername(): string {
    return localStorage.getItem(SessionName.NAME);
  }
  /**
   * Get authentication expiration
   *
   * @returns moment.Moment
   */
  getExpiration(): moment.Moment {
    const expiration = localStorage.getItem(SessionName.EXPIRE_AT);

    if (!expiration) {
      return null;
    }

    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  /**
   * Verify if user is authenticated is logged in
   *
   * @returns boolean
   */
  isLoggedIn(): boolean {
    if (!this.getExpiration()) {
      return false;
    }

    return moment().isBefore(this.getExpiration());
  }

  /**
   * Verify if user is authenticated is logged out
   *
   * @returns boolean
   */
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private setSession(result: any) {
    const token = result.token;
    const payload = jwtDecode(token) as JWTPayload;
    const expireAt = moment.unix(payload.expire_at);

    localStorage.setItem(SessionName.TOKEN, result.token);
    localStorage.setItem(SessionName.ID, payload.id.toString());
    localStorage.setItem(SessionName.NAME, payload.name);
    localStorage.setItem(SessionName.EXPIRE_AT, JSON.stringify(expireAt.valueOf()));
  }
}
