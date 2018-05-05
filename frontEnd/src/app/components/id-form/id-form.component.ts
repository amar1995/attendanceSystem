import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-id-form',
  templateUrl: './id-form.component.html',
  styleUrls: ['./id-form.component.css']
})
export class IdFormComponent implements OnInit {
  formId: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.formId = this.fb.group({
      id: '',
      register: '',
      edit: ''
    });
  }
  onSubmit() {
    console.log(this.formId);
    this.router.navigate(['/login']);
  }
}
