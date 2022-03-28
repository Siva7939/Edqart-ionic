// export const environment = {
//   production: true
// };

export const environment = {
  production: true,

  version2_baseUrl: "http://165.22.216.230:8900/",
  verison2InvoiceUrl: "http://165.22.216.230:9900/",
  // UAT
  assetsUrl: "/",
  baseUrl: "http://qa.edqart.com/master-data-api/",
  elasticUrl: 'http://128.199.22.83',

  hostUrl: 'http://qa.edqart.com',

  //GA-TAG
  // PROD
  // "GA-TAG": "G-YKG955EMY7",
  // Local
  // "GA-TAG": "G-YKG955EMY7",
  // UAT
  "GA-TAG": "G-YKG955EMY7",

  // sendToAirpayUrl: 'http://airpay.edvantagepoint.com/airpay/sendtoairpay.jsp',
  sendToAirpayUrl: 'https://airpay.edqart.com/airpay/sendtoairpay.jsp',

  // Prod
  // vendorUrl: 'https://seller.edqart.com',

  // QA
  vendorUrl: 'http://qa.seller.edqart.com',

  // QA Key
  // razorpayKey: "rzp_test_DiCR1eAmGiegML",

  //Prod Key
  razorpayKey: "rzp_live_zSnv9IITvqTT4Z",

  /*Note Please Change this acconding to environment for AirPay
   for qa environment AirpayEnv :"qa"
   for Production environment AirpayEnv :"prod"
   for stage environment AirpayEnv: "uat"
   for local environment AirpayEnv: "lc"
  */
  AirpayEnv: "prod"
};
