import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authService/authentication.service';

@Component({
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  user: number;
  attendances: any;
  constructor(private authService: AuthenticationService) {
    this.user = this.authService.getId();
   }

  ngOnInit() {
    this.authService.getAttendance().subscribe(data => {
      this.attendances = data['msg'];
    });
  }

  replaceTZ(time) {
    if ( time !== undefined ) {
    let t1 = time.replace(/[TZ]|.000/g , ' ');
    t1 = t1.split(' ');
    return t1[0];
    }
  }

  getTimes(time) {
    if ( time !== undefined) {
      const t = new Date(time);
      return  t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
    }
  }

}
