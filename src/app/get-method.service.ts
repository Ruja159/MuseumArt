import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMethodService {

  constructor(private http: HttpClient) { }

  getCollections() {
    return this.http.get('http://localhost:5000/api/getCollection')
  }

  getAllCollections() {
    return this.http.get('http://localhost:5000/api/getCollections')
  }
}
