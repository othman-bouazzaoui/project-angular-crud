import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.services';
import { from } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null=null;
  readonly dataStateEnum = DataStateEnum ;

  constructor(private productsServices : ProductsService, private router:Router) { 

  }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$=
    this.productsServices.getAllProducts().pipe(
      map(data =>  ({dataState : DataStateEnum.LOADED,data : data})),
      startWith({dataState : DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage : "c'est un erreur" + err.message}))
      );
  }
  onSearch(dataform:any){
    this.products$=
    this.productsServices.onSearchProduct(dataform.keyword).pipe(
      map(data =>  {
      console.log(data);
       return ({dataState : DataStateEnum.LOADED,data : data})
      }),
      startWith({dataState : DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage : "c'est un erreur" + err.message}))
      );
  }
  onSelect(p:Product){
    this.productsServices.onSelect(p).subscribe(
      data => {
        p.selected=data.selected;
      }
   );
  }
  onDelete(p:Product){
    console.log(p.id);
    this.productsServices.deleteProduct(p).subscribe(
      data =>{
        this.onGetAllProducts();
      });
  }
  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }
  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

}
