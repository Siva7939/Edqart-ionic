/**
 * Login API's
 */
export const AUTH_API = {
    // generateOtp: 'login/generateotp',
    // verifyOtp: 'login/verifyotp'
    generateOtp: 'sms/generateotp',
    verifyOtp: 'sms/verifyotp'
};

export const LANDING_API = {
    assets: 'assets/data/landing.json',
    getHomePageData: 'homepagedata'
}

export const SCHOOL_API = {
    getStoregrades: 'api/storegrades/',
    getCustomerPayment: 'getcustomerpayment/',
    getBySku: 'storeproduct/getbysku/',
    getMetaCode: 'api/metacode/getall/',
    getStoreByName: 'storeinfo/getbyname/',
    admissionVerify: 'api/admissionno/verify',
    customeCreate: 'customercreate',
    getCustomerbyMobile: 'getcustomerbymobile/',
    getStoresInfo:'store/name/',
    getStoreInfo:'store/code/'
}

export const PRODUCT_API = {
    list: '/list',
    storelist: 'storeproduct/getbystorecode',
    catproduct: 'homepagecatlist/category/',
    getProductReview: 'product/review/sku/'
};

export const API_WISH_LIST = {
    create: 'wishlist/create',

    getCount: 'wishlist/count/',
    getByMobileNumber: 'wishlist/get/mobileno/',
    getByLimit: 'wishlist/get/pagination/mobileno/',
    getById: 'wishlist/',
    getBySort: 'wishlist/get/mobileno/sort/',

    updateById: 'wishlist/update/',
    updateByMobileNum: 'wishlist/update/',

    deleteById: 'wishlist/delete/id/',
    deleteByMobileNum: 'wishlist/delete/mobileno/',
    deleteBySku: 'wishlist/delete/mobilenosku/'
}

export const API_CART = {
    create: 'cart/create',

    getCount: 'cart/count/', // required logined mobilenumber
    getAllItems: 'cart/mobileno/',
    getItemsLimit: 'cart/getbymobileno/',
    getById: 'cart/1',

    updateById: 'cart/update/id/',
    updateAll: 'cart/update',
    updateBySku: 'cart/update/',

    deleteById: 'cart/delete/id/', // required ID
    deleteByMobileNum: 'cart/delete/mobileno/', // required logined mobilenumber
    deleteByMobileSku: 'cart/delete/mobilesku/', // required mobile and SKU

    paymentValidate: 'payment/validate',

    shippingRule: 'shippingrule/shippingamount',

    couponValidate: 'coupon/validate',
    couponsAvailable: 'coupon/storecode/',
    couponsByMobile: 'coupon/mobileno/',

    retryPaymentValidate: 'order/pretry',
    retryPaymentCreate: 'order/pcreate '
}

export const API_PAYMENT = {
    paymentMethod: 'paymentmethod',
    razorpay: 'api/order/razorpay/capture',
    confirmorder: 'order/confirmorder',
}
export const API_ADDRESS_MANAGEMENT = {
    getAddress: 'user/mobileno/', // Mobile numbe is required
    getAddressBasedonId: 'user/id/', // Id is required
    deleteAddress: 'user/address/delete/mobileno/', // Mobile number is required
    updateuser: 'user/update/id/', // Id is required
    createAddress: 'user/address/create/userid/', // Id is required
    createChildren: 'user/children/create/userid/', // Id is required
    updateAddress: 'user/address/update/id/', // Id is required,
    verifyPincode: 'store/pincode/'
};

export const API_CHECKOUT = {
    getAll: 'checkout/mobileno/',
}
export const API_ORDER = {
    getOrdersByMobile: 'order/mobileno/',
    createOrder: 'order/create',
    cancelOrder: 'order/cancel',
    createReview: 'product/review',
    validateOrder: 'order/validate',
    getOrderByOrderNumber: 'order/number/',
    getOrderBytransactionId: 'order/mobileno/edtid/',
    getOrdersMissingReasons: 'order/cancel/reason',
    getOrdersReturnReasons: 'order/return/reason',
    getOrdersExchangeReasons: 'order/exchange/reason',
    returnExchangeReview: 'reorder/reviewrequest ',
    returnExchangeSubmit: 'reorder/submitrequest',
    getReturnOrExchangeOrders: 'reorder/mobileno/',
    invoiceCreate: 'invoice/create',
    refundpayment: 'order/payment/refund',
    uploadSpecialData: 'order/uploadstudentdata'
}
export const USER_SERVICE = {
    createUser: 'user/create',
    deleteById: 'user/delete/id/',
    getById: 'user/id/',
    getByMobile: 'user/mobileno/',
    updateById: 'user/update/id/',
    updateByMobileNum: 'user/update/mobileno/',
    getChildrenById: 'user/children/userid/',
    updateChildrenById: 'user/children/update/id/',
    updateChildrenByUserId: 'user/children/update/userid/',
    deleteChildrenById: 'user/children/delete/id/',
    createAddressByUserId: 'user/address/create/userid/',
    getAddressById: 'user/address/id/',
    getAddressByUserId: 'user/address/userid/',
    updateAddressById: 'user/address/update/id/',
    updateAddressByUserId: 'user/address/update/userid/',
    deleteAddressById: 'user/address/delete/id/',
    deleteAddressByuserId: 'user/address/delete/userid/',
    createChildrenById: "user/children/create/userid/"
}

export const API_AWS_IMAGE = {
    upload: 'aws/upload',
    delete: 'aws/deleteobject'
}
export const API_CONTACT_US = {
    addcontactinfo: 'addcontactinfo'
}
