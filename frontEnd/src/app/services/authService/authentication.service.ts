import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { LoginUser, TokenFormat, User, ServerDataModel } from '../../models/user.model';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';


@Injectable()
export class AuthenticationService {
  domain: 'http://localhost:3000/';
  httpHeader: HttpHeaders = new  HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'bearer ' + this.getToken());
  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

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
  isAdmin(): boolean {
    const token = this.getToken();
    const decoded: TokenFormat = jwt_decode(token);
    return decoded.isAdmin;
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
  getId(): number {
    const token = this.getToken();
    const decoded: TokenFormat = jwt_decode(token);
    return decoded.id;
  }

  getUserDetail() {
    // this.httpHeader.set('Authorization', 'bearer ' + this.getToken());
    // console.log(this.httpHeader);
    return this.http.get('http://localhost:3000/users/profile', {headers: this.httpHeader});
  }

  downloadPDF(filename, filetype): any {
    // return this.http.get('http://127.0.0.1:3000/file/' + filename);
  }

  showFileNames() {
    // return this.http.get('http://127.0.0.1:3000/files');
  }

  getAttendance(value) {
    if (this.isAdmin() && value !== this.getId() && value !== undefined) {
      const url = 'http://127.0.0.1:3000/admin/' + value + '/attendance';
      console.log(value.id);
      return this.http.get(url);
    } else {
      return this.http.get('http://127.0.0.1:3000/users/attendance', {headers: this.httpHeader});
    }
  }
  getProfileById(value) {
    if (this.isAdmin() && value.id) {
      const url = 'http://127.0.0.1:3000/admin/' + value.id + '/profile';
      console.log(url);
      return this.http.get(url);
    } else {
      const url = 'http://127.0.0.1:3000/users/profile';
      return this.http.get(url, {headers: this.httpHeader});
    }
  }

  registerNewUser(value) {
    console.log(value);
    return this.http.post('http://127.0.0.1:3000/users/register', value);
  }

  editUser(value) {
    if (this.isAdmin()) {
      const url = 'http://127.0.0.1:3000/admin/' + value.id + '/edit';
      return this.http.patch(url, value);
    } else {
      const url = 'http://127.0.0.1:3000/users/' + value.id + '/edit';
      return this.http.patch(url, value, {headers: this.httpHeader});
    }
  }
}
