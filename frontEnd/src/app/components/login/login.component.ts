import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authService/authentication.service';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myLoginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) {
    this.createForm();
   }

  ngOnInit() {
  }
  createForm() {
    this.myLoginForm = this.fb.group({
      id: '',
      password: ''
    });
  }

  onSubmit() {
    // console.log(this.myLoginForm.value);
    this.authService.onLogin(this.myLoginForm.value)
    .subscribe(data => {
      console.log(jwtDecode(data.token));
      if (data.success) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      }
    });
  }
}
