import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ColaboradorService } from '../colaborador.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ScrollToService } from 'ng2-scroll-to-el';


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

  carregar = false;
  message: string;
  messageType: string;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  private readonly imageType : string = 'data:image/jpg;base64,';
  slideConfigDesktop = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow":"<div class='nav-btn next-slide'></div>",
    "prevArrow":"<div class='nav-btn prev-slide'></div>",
    "dots":true,
    "infinite": true
  };

  slideConfigMobile = {
    "slidesToShow": 2,
    "slidesToScroll": 1,
    "dots":true,
    "infinite": true
  };

  constructor(private colaboradorService: ColaboradorService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService) {

    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      method: 'POST',
      itemAlias: 'file',
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
      authTokenHeader:  'Authorization',
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

    this.uploader.response.subscribe(res => this.response = res );
  }

  ngOnInit() {
    this.carregarImagens(false);
  }

  carregarImagens(carregar: boolean) {
    if(this.colaboradorService.colaboradorContas == undefined || carregar) {
      this.carregar = true;
      this.spinner.show();
      setTimeout(() => {
        this.colaboradorService.buscarColaboradorImagens(this.activatedRoute.snapshot.params['id'])
          .subscribe(
            res => {
              this.colaboradorService.colaboradorImagens = res;
              this.scrollService.scrollTo('#header');
              this.carregar = false;
              this.spinner.hide();
            },
            error => {
              console.log(error);
              this.messageType = 'danger';
              this.message = error;
              this.scrollService.scrollTo('#header');
              this.carregar = false;
              this.spinner.hide();
            }
        );
      }, 1000);
    }
  }

  getImage(imageLookAdress: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(this.imageType + imageLookAdress);
  }

  upload(item: FileItem) {
    let formData = new FormData();
    formData.append('file', item._file, this.activatedRoute.snapshot.params['id']);

    item.isUploading = true;
    item.progress = 50;
    this.uploader.progress = 50;
    this.colaboradorService.uploadImage(formData).subscribe(
      res => {
        console.log(res);
        item.progress = 100;
        this.uploader.progress = 100;
        item.isSuccess = true;
        item.isError = false;
        item.isUploading = false;
        this.carregarImagens(true);
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
      item.remove();
    });
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  slickInit(e) {
    // let el = document.getElementById('howWork');
    // return window.getComputedStyle(el).display == 'block';
    // console.log('slick initialized');
  }

  slickInit1(e) {
    // let el = document.getElementById('howWork');
    // console.log(window.getComputedStyle(el).display);
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

}
