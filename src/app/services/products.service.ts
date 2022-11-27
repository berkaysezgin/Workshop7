import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) {}
    getList(): Observable<Product[]>{
      return this.httpClient.get<Product[]>("http://localhost:3000/products");
    }
   }

