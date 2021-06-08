import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number = 0;
  public message: string = "";
  @Input() link = '';
  @Output() public onUploadFinished = new EventEmitter();

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
  }

  public uploadFile = (files: any) => {
    if(files.length === 0){
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(environment.urlAddress + this.link, formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if(event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total!);
      else if( event.type === HttpEventType.Response){
        this.message = 'Upload successful.';
        this.onUploadFinished.emit(event.body);
      }
    });
  }

}
