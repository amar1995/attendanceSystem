import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { LoginUser, TokenFormat, User } from '../../models/user.model';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AuthenticationService {
  domain: 'http://localhost:3000/';
  httpHeader: HttpHeaders = new  HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'bearer ' + this.getToken());
  constructor(private http: HttpClient) { }

  onLogin(value) {
    return this.http
    .post<LoginUser>('http://localhost:3000/users/signup', value);
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token): void {
    localStorage.setItem('token', token);
  }
  getTokenExpirationDate(token: string): Date {
    const decoded: TokenFormat = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  clearToken(): void {
    localStorage.clear();
  }

  getUserDetail(): Observable<User> {
    // this.httpHeader.set('Authorization', 'bearer ' + this.getToken());
    // console.log(this.httpHeader);
    return this.http.get<User>('http://localhost:3000/users/profile', {headers: this.httpHeader});
  }
}
