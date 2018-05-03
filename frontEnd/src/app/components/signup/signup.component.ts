import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userDetail: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.userDetail = this.fb.group({
      id: '',
      name: '',
      email_id: '',
      password: '',
      dateOfBirth: '',
      contactNumber: '',
      username: '',
      post: ''
    });
  }

  onSubmit() {
    console.log(this.userDetail.value.id , this.userDetail.value.name);
  }

}
