import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { API_CART, API_WISH_LIST } from 'src/app/constants/api-endpoints';
import { ROUTE_CART, ROUTE_PRODUCT_DETAILS } from 'src/app/constants/app.routeLinks';
import { AddToCartReqObj } from 'src/app/models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartNWishlistService {
    displayVariantsMap: any = [
        "Languages",
        "Courses",
        "Brands",
        "Publishers",
        "Subjects",
        "Colours",
        "DeviceTypes",
        "Sizes",
        // "Grades"
    ];

    constructor(private globalService: GlobalService, private api: ApiService, private router: Router) { }

    addToCart(product: any, selectedVariants?: any, isBuyNow?: boolean, cb?: Function) {
        if (!this.globalService.isLoggedIn && product.StoreCode !== "EDHR") {
            const toastMsg = { severity: "error", summary: "Login required", detail: "Please login to buy school specific products", life: 3000 };
            this.globalService.showToast(toastMsg);
            return;
        }

        const pVariants: any = product?.Variants || [];
        const variantsToBeSelected: any = pVariants.filter((v: any) => this.displayVariantsMap.indexOf(v.Name) >= 0);

        if (!selectedVariants) {
            selectedVariants = variantsToBeSelected.map((v: any) => ({
                Name: v.Name,
                DisplayLabel: v.DisplayLabel || v.Name,
                Value: v.Value[0],
                Code: v.Code[0]
            }));
        }

        const varaintsSelected = Object.keys(selectedVariants);
        if (variantsToBeSelected.length != varaintsSelected.length && product.ProductType.toUpperCase() !== "S") {
            const variantNames = variantsToBeSelected.map((v: any) => v.Name);
            const namesTobeSelected = variantNames.filter((n: string) => varaintsSelected.indexOf(n) < 0);

            const toastMsg = { severity: 'error', summary: 'Select Variants', detail: `Please select ${namesTobeSelected.join(', ')}`, life: 3000 };
            // const toastMsg = { severity: 'error', summary: 'Select Variants', detail: `Please select the required Variants`, life: 3000 };
            this.globalService.showToast(toastMsg);
            return;
        }

        if (product.ProductType.toUpperCase() !== "S") {
            this.navigateToDetails(product);
            return;
        }

        if (product.Quantity < product.MinimumBuyQty) {
            const toastMsg = { severity: 'error', summary: 'Minimum Quantity', detail: `Minimum Quantity to buy this product is ${product.MinimumBuyQty}`, life: 3000 };
            this.globalService.showToast(toastMsg);
            return;
        }

        const selectedStore = sessionStorage.getItem("selectedStore") || "EDHR";

        const userData = this.globalService.userData || {};
        if(this.globalService.isLoggedIn && !userData.Children.length && selectedStore !== product.StoreCode && product.StoreCode !== "EDHR") {
            const toastMsg = { severity: "error", summary: "", detail: "You can't buy products from this store as you have not registered for this store", life: 3000 };
            this.globalService.showToast(toastMsg);
            return;
        }
        
        if (selectedStore !== product.StoreCode && product.StoreCode !== "EDHR") {
            const toastMsg = { severity: "error", summary: "", detail: "You can't buy products from two different stores at a time", life: 3000 };
            this.globalService.showToast(toastMsg);
            return;
        }

        if (!product.WarehouseQty && product.ProductType.toUpperCase() === "S") {
            const toastMsg = { severity: "error", summary: "", detail: "This product is out of stock", life: 1000 };
            this.globalService.showToast(toastMsg);
            return;
        }

        const CartProduct: AddToCartReqObj = {
            Quantity: product.Quantity,
            MobileNo: this.globalService.usermobile ? this.globalService.usermobile : this.globalService.sessionId,
            SKU: product.SKU,
            VendorSKU: product.VendorSKU,
            VendorName: product.VendorName,
            VendorCode: product.VendorCode,
            StoreCode: product.StoreCode,
            StoreName: product.StoreName,
            ProductType: product.ProductType,
            ProductName: product.ProductName,
            Category: product.CategoryName,
            TaxAmount: product.TaxAmount,
            MaximumBuyQty: product.MaximumBuyQty ? product.MaximumBuyQty : 1,
            MinimumBuyQty: product.MinimumBuyQty ? product.MinimumBuyQty : 1,
            TaxPercentage: product.TaxPercentage || 0,
            Inventory: product.WarehouseQty,
            MRP: product.MRP,
            Discount: product.DiscountValue,
            TotalMRP: product.MRP * product.Quantity,
            TotalDiscount: product.DiscountValue * product.Quantity,
            PriceSaved: product.DiscountValue,
            BaseUnitPrice: product.BaseUnitPrice,
            DiscountPrice: product.DiscountPrice,
            DiscountValue: product.DiscountValue,
            MinimumPrice: product.MinimumPrice,
            MaximumPrice: product.MaximumPrice,
            GSTP: product.GSTP,
            GSTV: product.GSTV,
            SKUNature: product.SKUNature,
            Rating: product.Rating || 4,
            HSNCode: `${product.HSNCode}`,
            ImagePath: product.ImagePath || (product.Imagepath || (product.ProductImages && (product?.ProductImages?.Dimensions?.[0]?.Imagepath || product?.ProductImages?.[0]?.Imagepath))) || "",
            Variants: Object.values(selectedVariants),
            // ProductID: (product?._id || product?.ProductId?.$oid) || (product?.ProductID || ""),
            ProductID: (product?.DetailsID || (product?._id || product?.ProductId?.$oid)) || (product?.DetailsID || product?.ProductID),
            DetailsID: (product?.DetailsID || (product?._id || product?.ProductId?.$oid)) || (product?.DetailsID || "")
        };

        this.globalService.showLoader = true;
        this.api.post(API_CART.create, CartProduct, 'version2_baseUrl').subscribe((data: any) => {
            this.globalService.showLoader = false;
            if (data.status == "SUCCESS") {
                this.globalService.cartCount++;
                if (!isBuyNow) {
                    const toastMsg = { severity: 'success', summary: "", detail: "Product added to cart!", life: 3000 };
                    this.globalService.showToast(toastMsg);
                    if (cb) {
                        cb();
                    }
                } else {
                    this.router.navigate([ROUTE_CART]);
                }
            } else if(!isBuyNow){
                const toastMsg = { severity: 'error', summary: data.status, detail: data.message, life: 3000 };
                this.globalService.showToast(toastMsg);
            }
        }, (error: any) => {
            this.globalService.showLoader = false;
            const toastMsg = { severity: 'error', summary: error.status, detail: error.message, life: 3000 };
            this.globalService.showToast(toastMsg);
        });
    }

    addToWishList(product: any, selectedVariants?: any) {
        if (!this.globalService.isLoggedIn) {
            const toastMsg = { severity: "error", summary: "Login required", detail: "Please login to wishlist the product", life: 3000 };
            this.globalService.showToast(toastMsg);
            return;
        }

        const pVariants: any = product?.Variants || [];
        const variantsToBeSelected: any = pVariants.filter((v: any) => this.displayVariantsMap.indexOf(v.Name) >= 0);

        if (!selectedVariants) {
            selectedVariants = variantsToBeSelected.map((v: any) => ({
                Name: v.Name,
                DisplayLabel: v.DisplayLabel || v.Name,
                Value: v.Value[0],
                Code: v.Code[0]
            }));
        }
        const varaintsSelected = Object.keys(selectedVariants);
        if (variantsToBeSelected.length != varaintsSelected.length && product.ProductType.toUpperCase() !== "S") {
            const variantNames = variantsToBeSelected.map((v: any) => v.Name);
            const namesTobeSelected = variantNames.filter((n: string) => varaintsSelected.indexOf(n) < 0);

            const toastMsg = { severity: 'error', summary: 'Select Variants', detail: `Please select the required Variants`, life: 3000 };
            this.globalService.showToast(toastMsg);
            return;
        }
        if (product.ProductType.toUpperCase() !== "S") {
            this.navigateToDetails(product);
            return;
        }
        const payload = {
            "MobileNo": this.globalService.usermobile ? this.globalService.usermobile : this.globalService.sessionId,
            "SKU": product.SKU ? product.SKU : "",
            "VendorSKU": product.VendorSKU ? product.VendorSKU : "",
            "VendorName": product.VendorName ? product.VendorName : "",
            "VendorCode": product.VendorCode ? product.VendorCode : "",
            "StoreCode": product.StoreCode ? product.StoreCode : "",
            "StoreName": product.StoreName ? product.StoreName : "",
            "ProductType": product.ProductType ? product.ProductType : "",
            "ProductName": product.ProductName ? product.ProductName : "",
            "Category": product.CategoryName ? product.CategoryName : "",
            "TaxAmount": product.TaxAmount ? product.TaxAmount : 0,
            "TaxPercentage": product.TaxPercentage ? product.TaxPercentage : 0,
            "MaximumBuyQty": product.MaximumBuyQty ? product.MaximumBuyQty : 1,
            "MinimumBuyQty": product.MinimumBuyQty ? product.MinimumBuyQty : 1,
            "Inventory": product.WarehouseQty ? product.WarehouseQty : 0,
            "MRP": product.MRP ? product.MRP : 0,
            "Discount": product.DiscountPrice ? product.DiscountPrice : 0,
            "Quantity": product.Quantity || 1,
            "ImagePath": (product?.ProductImages?.Dimensions?.[0]?.Imagepath || product.ProductImages[0].Imagepath) || "",
            "TotalMRP": product.MRP ? product.MRP * (product.Quantity || 1) : 0,
            "TotalDiscount": product.DiscountPrice ? product.DiscountPrice * (product.Quantity || 1) : 0,
            "PriceSaved": product.MRP - (product.MRP - product.DiscountPrice),
            "BaseUnitPrice": product.BaseUnitPrice || 0,
            "DiscountPrice": product.DiscountPrice || 0,
            "DiscountValue": product.DiscountValue || 0,
            "MinimumPrice": product.MinimumPrice || 0,
            "MaximumPrice": product.MaximumPrice || 0,
            "GSTP": product.GSTP || 0,
            "GSTV": product.GSTV || 0,
            "SKUNature": product.SKUNature,
            "Rating": 5,
            "HSNCode": product.HSNCode ? product.HSNCode.toString() : "",
            "Variants": Object.values(selectedVariants),
            // "ProductID": (product._id || product.ProductId.$oid),
            "ProductID": product.DetailsID || (product._id || product.ProductId.$oid),
            "DetailsID": product.DetailsID || (product._id || product.ProductId.$oid)
        };

        this.globalService.showLoader = true;

        this.api.post(API_WISH_LIST.create, payload, 'version2_baseUrl').subscribe((data: any) => {
            this.globalService.showLoader = false;
            if (data.status == "SUCCESS") {
                const toastMsg = { severity: 'success', summary: data.status, detail: "Product has been added to wishlist", life: 3000 };
                this.globalService.showToast(toastMsg);
                this.globalService.wishlistCount++;
            } else {
                const toastMsg = { severity: "error", summary: data.status, detail: "Product already added to wishlist", life: 3000 };
                this.globalService.showToast(toastMsg);
            }
        },
        (error: any) => {
            this.globalService.showLoader = false;
            const toastMsg = { severity: 'error', summary: error.status, detail: error.message, life: 3000 };
            this.globalService.showToast(toastMsg);
        });
    }

    navigateToDetails(p: any) {
        const type = p.StoreCode === "EDHR" ? "general" : "store";
        // this.router.navigate([ROUTE_PRODUCT_DETAILS, type, (p._id || p.ProductId.$oid) || 'nil']);
        // $('html,body').animate({
        //     scrollTop: 0
        // }, 500);
        window.location.href = `${ROUTE_PRODUCT_DETAILS}${type}/${(p._id || p.ProductId.$oid) || 'nil'}`;
    }
}