import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"})
export class ProductsService {
    onSearchProduct(keyword:string) {
        let host = environment.host;
        console.log(keyword);
        return this.http.get<Product[]>(host+"/products?title_like="+keyword);
    }
    constructor(private http : HttpClient){
    }
    
    getAllProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products");
    }
    
    getProductById():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products/");
    }
    
    onSelect(product:Product):Observable<Product>{
        let host = environment.host;
        product.selected = !product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }
    
    deleteProduct(product:Product):Observable<void>{
        let host = environment.host;
        return this.http.delete<void>(host+"/products/"+product.id);
    }

    SaveProduct(product:Product):Observable<Product>{
        let host = environment.host;
        return this.http.post<Product>(host+"/products",product);
    }
    
    getProduct(id:number):Observable<Product>{
        let host = environment.host;
        return this.http.get<Product>(host+"/products/"+id);
    }
    
    updateProduct(product:Product):Observable<Product>{
        let host = environment.host;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }
    
}