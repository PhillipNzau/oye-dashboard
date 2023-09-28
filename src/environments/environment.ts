const baseUrl = 'https://oye.ke/ussd2/public/api/v1'

export const environment = {
    production: true,

    // User Urls
    loginUrl: baseUrl + '/login',
    refreshUrl: baseUrl + '/refresh/token',

    // transaction url
    transactionUrl: baseUrl + '/topups/list',
    checkStatusTransactionUrl: baseUrl + '/topups/check/status',
    checkAllTransactionUrl: baseUrl + '/topups/check/all',
    customersUrl: baseUrl + '/topups/customers',
    dashboardUrl: baseUrl + '/dashboard/stats',
    customersDashboardUrl: baseUrl + '/dashboard/customers/stats',
    customerDashboardUrl: baseUrl + '/dashboard/customer/stats'
};
