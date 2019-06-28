import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id', component: EditFormComponent },
  { path: 'new', component: EditFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
