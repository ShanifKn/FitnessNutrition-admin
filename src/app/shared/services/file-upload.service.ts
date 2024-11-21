import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { File } from 'buffer';
import { Observable } from 'rxjs';

const routes = {
  imageUpload: '/image-upload',
};

@Injectable()
export class FileUploadService {
  httpClient = inject(HttpClient);

  constructor() {}

  imageUplaod(data: any): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(routes.imageUpload, data);
  }
}
