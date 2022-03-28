import { ROUTE_CART, ROUTE_CHECKOUT, ROUTE_LOGIN, ROUTE_LOGIN_MESSAGE, ROUTE_MY_ACCOUNT, ROUTE_ORDERS, ROUTE_ORDER_SUCCESS, ROUTE_PRODUCT_LIST, ROUTE_PRODUCT_LIST_BY_TYPE, ROUTE_PRODUCT_LIST_GEN, ROUTE_SCHOOL_SEARCH, ROUTE_WISH_LIST } from "./app.routeLinks";

export const BREADCRUMB = {
    schoolSearch: [{ title: 'School Search', route: ROUTE_SCHOOL_SEARCH }],
    "/product-list/store": [{ title: 'Product List', route: ROUTE_PRODUCT_LIST }],
    "/product-list/general-products": [{ title: 'Generic Product', route: ROUTE_PRODUCT_LIST_GEN }],
    "/product-details/store": [
        { title: 'Product List', route: ROUTE_PRODUCT_LIST },
        { title: 'Product Details' }
    ],
    "/product-details/general": [
        { title: 'Generic Product', route: ROUTE_PRODUCT_LIST_GEN },
        { title: 'Product Details' }
    ],
    shoppingCart: [
        { title: 'Product List', route: ROUTE_PRODUCT_LIST_GEN },
        { title: 'Cart', route: ROUTE_CART }
    ],
    wishList: [{ title: 'Wish List', route: ROUTE_WISH_LIST }],
    cartReview: [
        { title: 'Product List', route: ROUTE_PRODUCT_LIST_GEN },
        { title: 'Cart', route: ROUTE_CART },
        { title: 'Review', route: ROUTE_CHECKOUT },
    ],
    payment: [
        { title: 'Product List', route: ROUTE_PRODUCT_LIST_GEN },
        { title: 'Cart', route: ROUTE_CART },
        { title: 'Review', route: ROUTE_CHECKOUT },
        { title: 'Payment', route: ROUTE_CHECKOUT },
    ],
    orderSuccess: [{ title: 'Order Status', route: ROUTE_ORDER_SUCCESS }],
    orders: [{ title: 'Orders', route: ROUTE_ORDERS }],
    myAccount: [{ title: 'My Account', route: ROUTE_MY_ACCOUNT }],
    signin: [{ title: 'Sign In', route: ROUTE_LOGIN }],
    loginMsg: [{ title: 'Login Message', route: ROUTE_LOGIN_MESSAGE }],
}
