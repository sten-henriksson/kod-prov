import { Component } from '@angular/core';
import {ApiService} from './api.service'
type ApiElement = {
  url: string,
  time: string,
  matches:string
  date: string
  keyword:string
}
// interface Hero {
//   id: number;
//   name: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})

export class AppComponent {
  
  constructor(private api: ApiService) {}
  urlToSend = '';
  searchInput ='';
  title = 'ang-front';
  apiList: ApiElement[] = [];
  getUrls(): void {
    this.api.getUrls()
      .subscribe(data => (this.apiList = data));
  }
  ngOnInit() {
    this.getUrls();
  }
  search(searchTerm: string) {
    if (searchTerm) {
      this.api
        .searchHeroes(searchTerm)//searchTerm)
        .subscribe(heroes => (this.apiList = heroes));
    } else {
      this.getUrls();
    }
  }
  sendUrl(url: string) {
    if (url) {
      this.api
        .sendUrl(url)//searchTerm)
        .subscribe(heroes => (this.apiList = heroes));
    } else {
      this.getUrls();
    }
  }
  
}
