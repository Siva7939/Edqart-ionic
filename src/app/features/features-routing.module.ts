import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesPage } from './features.page';
import { WishListComponent } from './wish-list/wish-list.component';
const routes: Routes = [
  {
    path: '',
    component: FeaturesPage,
    children: [
      {
        path: 'wish-list',
        data: { breadcrumb: 'wishList' },
        component: WishListComponent
      }
    ]
  },
  {
    path: 'wish-list',
    data: { breadcrumb: 'wishList' },
    component: WishListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesPageRoutingModule { }
