
export const environment = {
  production: false,
  assetsUrl: "/",

  baseUrl: "http://qa.edqart.com/master-data-api/",
  version2_baseUrl: "http://165.22.216.230:8900/",
  verison2InvoiceUrl: "http://165.22.216.230:9900/",

  elasticUrl: 'http://128.199.22.83',

  hostUrl: 'http://localhost:4200',

  // sendToAirpayUrl: 'http://airpay.edvantagepoint.com/airpay/sendtoairpay.jsp',
  sendToAirpayUrl: 'http://airpay.edqart.com/airpay/sendtoairpay.jsp',
  vendorUrl: 'http://qa.seller.edqart.com',

  // Prod

  // QA Key
  razorpayKey: "rzp_test_DiCR1eAmGiegML",

  //Prod Key
  // razorpayKey: "rzp_live_zSnv9IITvqTT4Z",

  /*Note Please Change this acconding to environment for AirPay
   for qa environment AirpayEnv :"qa"
   for Production environment AirpayEnv :"prod"
   for stage environment AirpayEnv: "stage"
   for local environment AirpayEnv: "lc"
  */

  AirpayEnv: "prod",

  MeasurementId: "G-3L2D7DNCLR"
};
