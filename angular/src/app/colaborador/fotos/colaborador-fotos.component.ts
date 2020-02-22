import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ColaboradorService } from '../colaborador.service';


const URL = '/sicds-colaborador-api/web/colaborador/upload/image';

@Component({
  selector: 'app-colaborador-fotos',
  templateUrl: './colaborador-fotos.component.html',
  styles: [
    `
    .my-drop-zone { border: dotted 3px lightgray; }
    .nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */
    .another-file-over-class { border: dotted 3px green; }
    .well {
        min-height: 200px;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
        text-align: center;
    }
    `
  ]
})
export class ColaboradorFotosComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor(private colaboradorService: ColaboradorService) {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      method: 'POST',
      itemAlias: 'file',
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
      authTokenHeader:  'Authentication',
      authToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZSJ9.Zr5btXBGTotvJdjk2cEe_8KxXP2yoa96Eh3J4rKzRgzrColBx6ka8kf2iJ6wNJQmzygG9idcT9Db56EmDcyq0Q',
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.headers = [{name: 'Content-Type', value: 'multipart/form-data; image/png;'}];
    };

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
  }

  ngOnInit() {
  }

  upload(item: FileItem) {
    let formData = new FormData();
    formData.append('file', item._file);

    item.isUploading = true;
    item.progress = 50;
    this.uploader.progress = 50;
    this.colaboradorService.uploadImage(formData).subscribe(
      res => {
        console.log(res);
        item.progress = 100;
        this.uploader.progress = 100;
        item.isSuccess = true;
        item.isUploading = false;
      },
      error => {
        item.progress = 0;
        this.uploader.progress = 0;
        item.isError = true;
        item.isUploading = false;
        console.log(error);
      }
    );
  }

  uploadAll() {
    console.log('all');

    this.uploader.queue.forEach(item => {

      let formData = new FormData();
      formData.append('file', item._file);

      item.isUploading = true;
      this.uploader.progress = 50;
      this.colaboradorService.uploadImage(formData).subscribe(
        res => {
          item.progress = 100;
          this.uploader.progress = 100;
          item.isSuccess = true;
          item.isUploading = false;
        },
        error => {
          item.progress = 0;
          this.uploader.progress = 0;
          item.isError = true;
          item.isUploading = false;
          console.log(error);
        }
      );
    });
  }

  removeAll() {
    this.uploader.queue.forEach(item => {

    });
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
