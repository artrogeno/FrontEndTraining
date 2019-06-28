import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: any = [];
  constructor() { }

  ngOnInit() {
    const listProducts = [
      { sku: 2030, product: 'Product 00', price: 909.99 },
      { sku: 2031, product: 'Product 01', price: 919.99 },
      { sku: 2032, product: 'Product 02', price: 929.99 },
      { sku: 2033, product: 'Product 03', price: 939.99 },
      { sku: 2034, product: 'Product 04', price: 949.99 },
      { sku: 2035, product: 'Product 05', price: 959.99 },
      { sku: 2036, product: 'Product 06', price: 969.99 },
      { sku: 2037, product: 'Product 07', price: 979.99 },
      { sku: 2038, product: 'Product 08', price: 989.99 },
      { sku: 2039, product: 'Product 09', price: 999.99 },
      { sku: 2040, product: 'Product 10', price: 1000.99 }
    ];

    // Convert Array/Object in String
    const ProductsFy = JSON.stringify(listProducts);
    // Save in localstorage
    localStorage.setItem('ls-products', ProductsFy);

    // Getting products localstorage
    const localProducts = localStorage.getItem('ls-products');

    // Converting and setting products
    this.products = JSON.parse(localProducts);


    // CREATED
    // localStorage.setItem('key', 'value');

    // GETTING
    // localStorage.getItem('key');

    // REMOVED ITEM
    // localStorage.removeItem('key');

    // DELETE ALL IN LOCALSTORAGE
    // localStorage.clear();
  }

}
