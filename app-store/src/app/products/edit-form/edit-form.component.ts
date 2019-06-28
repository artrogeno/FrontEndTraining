import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  public product: any = {};
  public create: boolean;
  public msg: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  addProduct(product) {
    let localArrayProducts = [];
    // Create id
    product.id = Date.now();
    // Get Products on localstorage
    const localStringProducts = localStorage.getItem('ls-products');
    const list = JSON.parse(localStringProducts);
    if ( list && list.length > 0 ) {
      localArrayProducts = list;
    }
    // Add Product on Array
    localArrayProducts.push(product);
    // Add Product on localstorage
    const listaToString = JSON.stringify(localArrayProducts);
    localStorage.setItem('ls-products', listaToString);
    this._alertMessage(false, 'Created product.');
  }

  updateProduct(product) {
    // Get Products on localstorage
    const localStringProducts = localStorage.getItem('ls-products');
    const localArrayProducts = JSON.parse(localStringProducts);
    // Update list product
    localArrayProducts.map(item => {
      if (item.id === product.id) {
        item = product;
      }
    });
    // Update Product on localstorage
    const listaToString = JSON.stringify(localArrayProducts);
    localStorage.setItem('ls-products', listaToString);
    this._alertMessage(false, 'Updated product.');
  }

  _alertMessage(isError, message) {
    if (isError) {
      this.msg = { error: true, message };
    } else {
      this.msg = { error: false, message };
    }
    // It's going to close in 3s.
    setTimeout(() => {
      // Clear message
      this.msg = {};
      if (isError === false) {
        // It's ok! redirect to products
        this.router.navigate(['/', 'products']);
      }
    }, 3000);
  }

  _checkIfExistProduct(form) {
    // Get products localstorage
    const localStringProducts = localStorage.getItem('ls-products');
    // Convert in Array Object
    const localArrayProducts = JSON.parse(localStringProducts);
    // Filter and check if product exist
    if (localArrayProducts) {
      const listFilter = localArrayProducts.filter(item => {
        if (item.product === form.product || item.sku === form.sku || item.id === form.id ) {
          return true;
        }
      });
      // Check if product return in filter
      if (listFilter.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  _findProductLocalStorage(id) {
    const localStringProducts = localStorage.getItem('ls-products');
    const localArrayProducts = JSON.parse(localStringProducts);
    const getProduct = localArrayProducts.filter(item => {
      if (item.id === id) {
        return true;
      }
    });
    if (getProduct.length > 0) {
      return getProduct[0];
    } else {
      return null;
    }
  }

  onSubmit(form: NgForm) {
    const { id, product } = form.value;

    // Force value false if value === ''
    if (form.value.active === '') {
      form.value.active = false;
    }

    // CHECK PRODUCT
    const check = this._checkIfExistProduct(form.value);

    // UPDATE
    if (this.create === false && id && product ) {
      if (check === true) {
        this.updateProduct(form.value);
      } else {
        // ERROR product not found
        this._alertMessage(true, 'Product not found!');
      }
    } else {
    // CREATE
      if (check === false) {
        this.addProduct(form.value);
      } else {
        // ERROR product really exist
        this._alertMessage(true, 'Product really exist!');
      }
    }
  }

  ngOnInit() {
    // Get params in URL
    const { id } = this.route.snapshot.params;

    if (id === 'new') {
      this.create = true;
    } else {
      const findProduct = this._findProductLocalStorage( Number(id) );
      // Find product
      if (findProduct) {
        this.product = findProduct;
        this.create = false;
      } else {
      // Redirect if id not exists
        this.router.navigate(['/', 'products', 'new']);
      }
    }
  }

}
