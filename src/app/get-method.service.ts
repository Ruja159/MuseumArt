import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMethodService {

  constructor(private http: HttpClient) { }

  getCollections() {
    return this.http.get('http://localhost:3001/api/getCollection')
  }

  getAllCollections() {
    return this.http.get('http://localhost:3001/api/getCollections')
  }

  getCollectionById(id){
    return this.http.get(`http://localhost:3001/api/getCollectionById/${id}`)
  }
}
