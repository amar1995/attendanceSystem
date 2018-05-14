import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authService/authentication.service';
import { User } from '../../models/user.model';
import { Subject } from '../../models/subjects.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetail = { };
  value = {};
  constructor(private authService: AuthenticationService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.value['id'] = this.activeRoute.snapshot.params.id;
    this.authService.getProfileById(this.value).subscribe(data => {
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
        this.userDetail['dateOfJoining'] = data['dateOfJoining'];
      }
    });
  }

  replaceTZ(time) {
    if ( time !== undefined ) {
    let t1 = time.replace(/[TZ]|.000/g , ' ');
    t1 = t1.split(' ');
    return t1[0];
    }
  }

}
