import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public toaster: BehaviorSubject<any>;
  public toasterConfirm: BehaviorSubject<any>;

  public isLoggedIn: boolean = false;
  public cartCount: number = 0;
  public wishlistCount: number = 0;
  public previousRoute: any = null;
  public usermobile: any;
  public customerPayments: any = {};
  public selectedSchool: any = {};
  public EDQART_SELECTED_SCHOOL: any = {};
  public store: any = {};
  public student: any = {};
  public storeUser: any = {};
  public userType: string = '';
  public admissionNo: string = '';
  public sessionId: string = '';
  public checkoutData:any;
  public paymentData: any = {};
  public couponData: any = {};
  public availableCoupons:any = [];
  public addressEdit: boolean = false;
  public orderValidateData: any;
  public retryPaymentEnable: boolean = false;
  public showLoader: boolean = false;
  public userData: any;
  public vivoAuthForm: any;
  public specialProdExists: boolean = false;

  constructor() {
    this.toaster = new BehaviorSubject<any>(null);
    this.toasterConfirm = new BehaviorSubject<any>(null);
    const sessionId = sessionStorage.getItem('sessionId');
    const edqartUserMobile = localStorage.getItem('edqartUserMobile');

    if(sessionId && !edqartUserMobile) {
      this.sessionId = sessionId;
    } else if(!edqartUserMobile) {
      this.sessionId = "guest_" + this.getUUID();
      sessionStorage.setItem('sessionId', this.sessionId);
    }
    // if(!this.isLoggedIn && !edqartUserMobile) {
    //   localStorage.setItem('edqartUserMobile', this.sessionId);
    // }
  }

  showToast(data) {
    this.toaster.next(data);
  }

  showConfirm(data) {
    this.toasterConfirm.next(data);
  }

  getUUID() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // Creating Model format obj and removing remaining keys in mainObj
  getExpectedModelObjData(modelObj, mainObj) {
    let finalObj = {};
    Object.keys(modelObj).forEach(key => {
      if (mainObj[key]) {
        finalObj[key] = mainObj[key]
      }
    });
    return finalObj;
  }
}
