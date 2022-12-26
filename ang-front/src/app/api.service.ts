import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
type ApiElement = {
  url: string,
  time: string,
  matches:string
  date: string
  keyword:string
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getUrls(): Observable<ApiElement[]> {
    return this.http.get<ApiElement[]>("http://localhost:1339/urls")
      .pipe(
      );
  }
  sendUrl(url: string): Observable<ApiElement[]> {
    // Add safe, URL encoded search parameter if there is a search term
    const options = url ?
     { params: new HttpParams().set('url', url) } : {};

    return this.http.get<ApiElement[]>("http://localhost:1339/search", options)
      .pipe(
      );
  }
  searchHeroes(url: string): Observable<ApiElement[]> {
    // Add safe, URL encoded search parameter if there is a search term
    const options = url ?
     { params: new HttpParams().set('url', url) } : {};

    return this.http.post<ApiElement[]>("http://localhost:1339/speedurl",{url,"mach":"test"}, options)
      .pipe(
      );
  }
}
