import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {  AuthenticationService } from '../../services/authService/authentication.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  constructor(private FileService: AuthenticationService) { }
  private files = [];
  private url = 'http://localhost:3000/upload';
  private uploader: FileUploader;

  ngOnInit() {
    this.uploader = new FileUploader({url: this.url});

    // this.FileService.showFileNames().subscribe(response => {
    //   for (let i = 0; i < response.json().length; i++) {
    //     this.files[i] = {
    //       filename: response.json()[i].filename,
    //       originalname: response.json()[i].originalname,
    //       contentType: response.json()[i].contentType
    //     };
    //   }
    // });
  }

  // downloadPdf(filename, contentType) {
  //   this.FileService.downloadPDF(filename, contentType).subscribe(
  //     (res) => {
  //       const file = new Blob([res.blob()], { type: contentType });
  //     const fileURL = URL.createObjectURL(file);
  //     window.open(fileURL);
  //     }
  //   );
  // }
}
