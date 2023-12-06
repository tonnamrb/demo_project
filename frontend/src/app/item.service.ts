// item.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api';
  private apiUrlEdit = 'http://localhost:3000/api/items';
  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl+"/allItems");
  }

 
  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/createItem", item);
  }
  getItemById(itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrlEdit}/${itemId}`);
  }

  updateItem(itemId: number, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlEdit}/${itemId}`, updatedItem);
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlEdit}/${itemId}`);
  }
}
