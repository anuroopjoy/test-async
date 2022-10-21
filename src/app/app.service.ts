import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get('https://fakerapi.it/api/v1/books?_quantity=1');
  }
}
