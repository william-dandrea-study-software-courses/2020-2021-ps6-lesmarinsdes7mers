import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiUnsplashService {

  private url = 'https://api.unsplash.com/search/photos?client_id=-ozCm-naWd_KecnLbpIiqBpdGocbKH_IXgFblJ4CjSQ&query=';

  constructor(private http: HttpClient) { }

  getUrls(nameRequest: string): void {

  }
}
