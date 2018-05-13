import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authService/authentication.service';

@Component({
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getAttendance().subscribe(data => console.log(data));
  }

}
