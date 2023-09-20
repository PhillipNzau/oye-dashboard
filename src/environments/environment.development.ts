const baseUrl = 'https://oye.ke/ussd2/public/api/v1'
export const environment = {
    production: false,

    // User Urls
    loginUrl: baseUrl + '/login',
    refreshUrl: baseUrl + '/refresh/token',
    transactionUrl: baseUrl + '/topups/list',
    customersUrl: baseUrl + '/topups/customers',

};
