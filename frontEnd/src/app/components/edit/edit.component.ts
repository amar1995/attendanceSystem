import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authService/authentication.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userDetail = { };
  form: FormGroup;
  constructor(private authService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.authService.getUserDetail().subscribe(data => {
      console.log(data['msg']);
      data = data['msg'];
      this.userDetail['id'] = data['id'];
      this.userDetail['name'] = data['name'];
      this.userDetail['subject'] = data['subject'];
      this.userDetail['address'] = data['address'];
      this.userDetail['email_id'] = data['email_id'];
      this.userDetail['dateOfBirth'] = data['dateOfBirth'];
      this.userDetail['contactNumber'] = data['contactNumber'];
      this.userDetail['post'] = data['post'];
      if ( data['dateOfJoining']) {
        this.userDetail['dateOfJoining'] = data['dateOfJoining'].slice(0, 10);
      }
    });
  }

  createForm() {
    this.form = this.fb.group({
      id: this.userDetail['id'],
      name: this.userDetail['name'],
      email_id: this.userDetail['email_id'],
      contactNumber: this.userDetail['contactNumber'],
      dateOfBirth: this.userDetail['dateOfBirth'],
      post: this.userDetail['post'],
      subject: this.userDetail['subject']
    });
  }

  replaceTZ(time) {
    if (time !== undefined ) {
    let t1 = time.replace(/[TZ]|.000/g , ' ');
    t1 = t1.split(' ');
    return t1[0];
    }
  }

  onSubmitEdit() {

  }
}

