import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemEditComponent } from './item-edit/item-edit.component';


const routes: Routes = [
  { path: '', component: ItemListComponent, pathMatch: 'full' },
  { path: 'create', component: ItemCreateComponent },
  { path: 'edit/:id', component: ItemEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
