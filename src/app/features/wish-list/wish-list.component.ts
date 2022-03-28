import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CART, API_WISH_LIST } from 'src/app/constants/api-endpoints';
import { ROUTE_PRODUCT_LIST, ROUTE_PRODUCT_DETAILS } from 'src/app/constants/app.routeLinks';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { CartNWishlistService } from 'src/app/services/cartNwishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  loading = false;
  wishListitems: any = [];
  displayPageCount: any = [5, 10, 15, 20];
  sortItems: any = [{ order: "Low to High", value: "desc" }, { order: "High to Low", value: "ASC" }]
  pageCount: any;
  offset: any = 0;
  limt: any = 5;
  sortValue: any;
  selectedvalue: any;
  selectedSchool: string;

  constructor(private apiService: ApiService, public globalService: GlobalService, private router: Router, public cNwService: CartNWishlistService,) { }

  ngOnInit(): void {
    this.getWishListData();
    this.wishlistPageCount(10);
    this.wishlistSort(this.sortItems[0].value, this.sortItems[0].order);
    this.selectedSchool = sessionStorage.getItem("selectedStore") || '';
    // this.gridListView();
  }

  wishlistPageCount(pagecount) {
    this.limt = pagecount;
    this.loading = true;
    let url = `${API_WISH_LIST.getByLimit}${this.globalService.usermobile}/${this.offset}/${this.limt}`;
    this.apiService.get(url, 'version2_baseUrl').subscribe(
      res => {
        this.wishListitems = res && res.data || [];
        this.globalService.wishlistCount = this.wishListitems.length;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  wishlistSort(sort, orderValue) {
    this.selectedvalue = orderValue;
    this.loading = true;
    let url = `${API_WISH_LIST.getBySort}${this.globalService.usermobile}/${sort}`;
    this.apiService.get(url, 'version2_baseUrl').subscribe(
      res => {
        this.wishListitems = res && res.data || [];
        this.globalService.wishlistCount = this.wishListitems.length;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  getWishListData() {
    this.loading = true;
    let url = `${API_WISH_LIST.getByMobileNumber}${this.globalService.usermobile}`;
    this.apiService.get(url, 'version2_baseUrl').subscribe(
      res => {
        this.wishListitems = res && res.data || [];
        this.globalService.wishlistCount = this.wishListitems.length;
        this.loading = false;
      },  // const toastMsg = { severity: 'success', summary: data.status, detail: data.message };
      // this.globalService.showToast(toastMsg);
      error => {
        this.loading = false;
      }
    );
  }

  navigateToDetails(p: any) {
    this.router.navigate([ROUTE_PRODUCT_DETAILS,'store',p.ProductID]);
    // $('html,body').animate({
    //   scrollTop: 0
    // }, 500);
  }

  addCartPage(itemData: any) {
    if (!itemData.Inventory && itemData.ProductType.toUpperCase() === "S") {
      const toastMsg = { severity: "error", summary: "", detail: "This product is out of stock", life:1000 };
      this.globalService.showToast(toastMsg);
      return;
    }
    else{
      itemData['WarehouseQty'] = itemData.Inventory || 0;
      itemData['ProductType'] = "S";
      itemData["ProductID"] = itemData["ProductID"].toString();
      this.cNwService.addToCart(itemData, null, false, () => {
        this.deleteItem(itemData.ID, 'addtocart');
      });
    }
  }

  addCartPage2(itemData: any) {
    if (this.selectedSchool !== itemData.StoreCode && itemData.StoreCode !== "EDHR") {
      const toastMsg = { severity: "error", summary: "", detail: "You can't buy products from two different stores at a time", life: 1000 };
      this.globalService.showToast(toastMsg);
      return;
    }

    // if (itemData.ProductType.toUpperCase() !== "S") {
    //   this.navigateToDetails(itemData);
    //   return;
    // }

    const body: any = {
      MobileNo: itemData.MobileNo,
      SKU: itemData.SKU,
      VendorSKU: itemData.VendorSKU,
      VendorName: itemData.VendorName,
      VendorCode: itemData.VendorCode,
      StoreCode: itemData.StoreCode,
      StoreName: itemData.StoreName,
      ProductType: itemData.ProductType,
      ProductName: itemData.ProductName,
      Category: itemData.Category,
      MRP: itemData.MRP,
      Discount: itemData.Discount,
      Quantity: itemData.Quantity,
      ImagePath: itemData.ImagePath,
      WarehouseCode: itemData.WarehouseCode,
      WarehouseName: itemData.WarehouseName,
      TotalMRP: itemData.TotalMRP,
      TotalDiscount: itemData.TotalDiscount,
      PriceSaved: itemData.PriceSaved,
      Rating: itemData.Rating,
      Inventory: itemData.Inventory,
      MaximumBuyQty: itemData.MaximumBuyQty,
      MinimumBuyQty: itemData.MinimumBuyQty,
      WarehouseQty: itemData.WarehouseQty
    };

    let url = `${API_CART.create}`;
    this.apiService.post(url, body, 'version2_baseUrl').subscribe(
      data => {
        // const toastMsg = { severity: 'success', summary: data.status, detail: data.message };
        // this.globalService.showToast(toastMsg);
        if (data.message == "Cart Created Successfully.") {
          this.globalService.cartCount++;
          const toastMsg = { severity: 'success', summary: data.status, detail: data.message, life: 1000 };
          this.globalService.showToast(toastMsg);
        } else {
          const toastMsg = { severity: 'error', summary: data.status, detail: data.message, life: 1000 };
          this.globalService.showToast(toastMsg);
        }
        this.deleteItem(itemData.ID, 'addtocart');
        this.loading = false;
        // this.router.navigate([ROUTE_CART])
      },
      error => {
        const toastMsg = { severity: 'error', summary: error.status, detail: error.message, life: 1000 };
        this.globalService.showToast(toastMsg);
        this.loading = false;
      }
    )
  }

  deleteItem(itemData, cart) {
    let url = `${API_WISH_LIST.deleteById}${itemData}`;
    this.apiService.delete(url, 'version2_baseUrl').subscribe(
      data => {
        // if(!cart){
        //   const toastMsg = { severity: 'success', summary: data.status, detail: data.message };
        //   this.globalService.showToast(toastMsg);
        // }
        if (data.message == "Cart Created Successfully." || data.message == "WishList Deleted Successfully.") {
          if (!cart) {
            const toastMsg = { severity: 'success', summary: data.status, detail:"Product has been removed from wishlist", life:3000 };
            this.globalService.showToast(toastMsg);
            this.globalService.wishlistCount--;
          }
        }
        this.loading = false;
        this.getWishListData();
      },
      error => {
        const toastMsg = { severity: 'success', summary: error.status, detail: error.message, life:3000 };
        this.globalService.showToast(toastMsg);
        this.loading = false;
      }
    );
  }

  navigateToProductList() {
    this.router.navigate([ROUTE_PRODUCT_LIST]);
  }
}
