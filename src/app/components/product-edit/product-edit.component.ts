import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'console';
import { ProductsService } from 'src/app/services/products.services';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
 productId : number;
 productFormGroup?:FormGroup;
 submitted : boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private productService:ProductsService, private fb:FormBuilder) { 
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
    .subscribe(
      product =>{
        this.productFormGroup = this.fb.group({
          id : [product.id,Validators.required],
          title : [product.title,Validators.required],
          prix : [product.prix,Validators.required],
          selected : [product.selected] 
        })

      });
  }
  onUpdateProduct(){
     this.submitted = true;
     if(this.productFormGroup?.invalid) return;
        this.productService.updateProduct(this.productFormGroup?.value)
        .subscribe(data => {
          alert("La modification est reussi !!!");
        })
  }

}
