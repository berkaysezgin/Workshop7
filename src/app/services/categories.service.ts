import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//:Injectable, bir clas'ın IoC'e katılması ve injectable olmasını sağlar.Dependency Injection mekanizmasını 
//kullanarak servisin referansını alabiliriz.
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
//: Generic,bir class'ın metodun içerisind ekullanılacak tipi tipleri belirlemek için kullanılır.
  constructor(private httpClient:HttpClient) { }
  getList(): Observable<Category[]>{
return this.httpClient.get<Category[]>("http://localhost:3000/categories");
  }
}
