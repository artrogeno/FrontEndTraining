import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: any = [];
  constructor() { }


  listProducts() {
    const localProducts = localStorage.getItem('ls-products');
    this.products = JSON.parse(localProducts);
  }

  removeProduct(id) {
    let products = [];
    let updateProducts = [];
    const localProducts = localStorage.getItem('ls-products');
    products = JSON.parse(localProducts);

    // Filter and return all diff by id
    updateProducts = products.filter(item => item.id !== id);

    // Save on localstorage
    localStorage.setItem('ls-products', JSON.stringify(updateProducts));

    // Update table
    this.listProducts();
  }

  ngOnInit() {
    this.listProducts();
  }

}
