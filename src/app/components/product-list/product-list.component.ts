import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productCardClass: string = 'card col-3 ms-3 mb-3';

  products!: Product[];

private _productListItems:any[]=[{label:'name',value:null,discn:null}]
get productListItems(): any[] {
  return [
    ...this._productListItems,...this.products.map((c) => {
      return { label: c.name, value: c.categoryId ,discn:c.discontinued};
    }),
  ];
}


  public selectedProductCategoryId: number | null = 0
  public isLoading:boolean=false;

  searchProductNameInput:string|null=null;


  get filteredProducts(): any[] {
    
    let filteredProducts = this.productListItems;
  
     if (this.selectedProductCategoryId)
       filteredProducts = filteredProducts.filter(
         (p) => p.value
        
       === this.selectedProductCategoryId
    );

    if (this.searchProductNameInput)
      filteredProducts = filteredProducts.filter((p) =>
        p.label
          .toLowerCase()
          .includes(this.searchProductNameInput?.toLowerCase())
      );

    return filteredProducts;
  }

//---
  // private _productListItems: any[] = [{ label: 'All', value: null }];
  // get productListItems(): any[] {
  //   return [
  //     ...this._productListItems,...this.products.map((c) => {
  //       return { label: c.name, value: c.id };
  //     }),
  //   ];
  // }
  //:ActivatedRoute mevcut route bilgisini almak için kullanılır
  //Route:yeni route bilgisini almak için 
  constructor(private activatedRoute:ActivatedRoute,
    private productService:ProductsService,
    private router: Router
    ){ }

  
  // NG ON INIT
  ngOnInit(): void {
    this.getCategoryIdFromRoute();
    this.getListProducts();
    
    //:ngOnInit() methodu'u component'in oluşturulduğu an çalışır.

  }
 // GET LIST PRODUCTS
  getListProducts(){
    this.productService.getList().subscribe((response)=>{
      setTimeout(() => {
        this.products=response;
      
      this.isLoading=true;
      }, 1000);
      
    })
  }
  

// GET CATEGORY ID FROM ROUTE
  getCategoryIdFromRoute(): void {
    //*Observer Design Pattern
   this.activatedRoute.params.subscribe((params)=>{
    if(params['categoryId']!==undefined){
this.selectedProductCategoryId=Number(params['categoryId']);
}

    
   });//* Callback
  }
  // GET SEARCH PRODUCT NAME FROM ROUTE
getSearchProductNameFromRoute():void{
  this.activatedRoute.queryParams.subscribe((queryParams)=>{
    if(queryParams['searchProductName']&&
    queryParams['searchProductName']!==this.searchProductNameInput)
    {
      this.searchProductNameInput=queryParams['searchProductName'];
}
//Defensive Programming
if(
  !queryParams['searchProductName']&&
  this.searchProductNameInput!==null
  )
this.searchProductNameInput=null;
    
   });
}

  isProductCardShow(product: any): boolean {
   
    return product.discn== false;

  }
  
//O N
  onSearchProductNameChange(event:any):void{
   // this.searchProductNameInput=event.target.value;//ngModelimiz bu işlemi gerçekleştiriyor.
    const queryParams: any={};
    if(this.searchProductNameInput !=='') 
    queryParams['searchProductName']=this.searchProductNameInput;
    this.router.navigate([],{
      queryParams:queryParams,
      
    });
  } 
   isSelectedProductCategoryId(categoryId: number | null): boolean {
     return categoryId === this.selectedProductCategoryId;
   }

  //  isProductsLoading() {
  
  //   return this.isLoading;
    
    
  //   }
}



