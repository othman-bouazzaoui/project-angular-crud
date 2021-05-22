import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.services';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted : boolean=false;

  constructor(private fb:FormBuilder, private productService:ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      title:["",Validators.required],
      prix :[0,Validators.required],
      selected : [true]
    });
  }
  onSaveProduct(){
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
    this.productService.SaveProduct(this.productFormGroup?.value).subscribe(data =>{
      alert("L'ajoute est reussi !");
      this.router.navigateByUrl("/products");
    });
  }

}
