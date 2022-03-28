import { environment } from 'src/environments/environment';

export const ROUTE_LOGIN = '/auth/signin';
export const SERVICE_LIST = '/list'; 
export const ROUTE_V1_PRODUCT_LIST = `${environment.hostUrl}/app/products/list/category?id=`;
export const ROUTE_V1_BEYOND_ACADEMICS_LIST = `${environment.hostUrl}/beyond-academics/list?cat=`;
export const ROUTE_LOGIN_MESSAGE= '/auth/login-messeage';
export const ROUTE_WISH_LIST = '/features/wish-list';
export const ROUTE_CART = '/features/shopping-cart';
export const ROUTE_SCHOOL_SEARCH = '/features/school-search';
export const ROUTE_PRODUCT_LIST = '/features/product-list/store/';
export const ROUTE_PRODUCT_LIST_NEW = '/features/product-list/store';
export const ROUTE_PRODUCT_LIST_GEN = '/features/product-list/general-products';
export const ROUTE_PRODUCT_LIST_BY_TYPE = '/features/product-list/';
export const ROUTE_PRODUCT_DETAILS = '/features/product-details/';
export const ROUTE_FAQ = '/content/faq';
export const ROUTE_ABOUT_US = '/content/about-us';
export const ROUTE_CANCEL_EXCHANGE= '/content/cancel-refund';
export const ROUTE_PRIVACY_POLICY = '/content/privacy-policy';
export const ROUTE_PAYMENT_POLICY= '/content/payment-policy';
export const ROUTE_SHIPPING_POLICY= '/content/shipping-policy';
export const ROUTE_TERSMS_OF_USE= '/content/terms-conditions';
export const ROUTE_CONTCT_US = '/content/contactus';
export const ROUTE_CHECKOUT = '/features/cart-review';
export const ROUTE_ORDERS = '/orders';
export const ROUTE_MY_ACCOUNT = '/userManagement/my-account';
export const VENDOR_URL = environment.vendorUrl;
export const HOST_URL = environment.hostUrl;
export const VIVO_URL = '/features/product-list/general;category=Electronics';
export const ROUTE_ORDER_SUCCESS = '/features/order-success';
export const ROUTE_CANCEL_ORDER = '/orders/cancelOrder';
export const ROUTE_PRODUCT_REVIEW = '/orders/productReview';
export const ROUTE_TRACK_ORDER = '/orders/trackOrder';
export const ROUTE_RETURN_EXCHANGE = '/orders/returnExchange';
export const ROUTE_DELIVERY_FEEDBACK = '/orders/deliveryFeedback';
export const ROUTE_REVIEW_RETURN_EXCHANGE = '/orders/reviewReturnExchange';
export const ROUTE_RETURN_EXCHANGE_POLICY = '/content/cancel-refund';
export const ROUTE_PAYMENT = '/payment'


