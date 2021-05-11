import { Injectable } from '@angular/core';
import {IUnsplashRequest, IUnsplashUrls} from "../models/unsplash.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UnplashService {

  private urlUnsplash = 'https://api.unsplash.com/search/photos?client_id=-ozCm-naWd_KecnLbpIiqBpdGocbKH_IXgFblJ4CjSQ&query=';

  constructor(private http: HttpClient) { }

  searchPhoto(searchValue: string): Promise<string> {
    console.log("efefe: "+searchValue)
    return new Promise<string>((resolve, reject) => {
      const url = this.urlUnsplash + searchValue;
      this.http.get<IUnsplashRequest>(url).subscribe({ next: (response) => {
          const urls: IUnsplashUrls[] = response.results.slice(0, 9).map(res2 => res2.urls);
          const urlPos = Math.floor(Math.random() * 11);
          const url = urls[urlPos];
          resolve(url.regular.toString());
        }, error: err => reject.apply(err)})
    });
  }

}
