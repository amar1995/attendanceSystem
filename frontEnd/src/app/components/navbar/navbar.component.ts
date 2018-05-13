import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authService/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  isLogin() {
    return this.authService.isTokenExpired();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  onLogout() {
    this.authService.clearToken();
  }
}
