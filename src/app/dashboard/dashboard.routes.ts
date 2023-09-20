import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { CustomerResolver } from "./shared/resolver/customer.resolver";
// import { DashboardComponent } from "./dashboard.component";

export const DASHBOARD_ROUTES:Route[] = [
    { 
        path:'', component : DashboardComponent,
        children: [
            {path:'', loadComponent:() => import('./home/home.component').then(mod => mod.HomeComponent)},
            {path:'transactions', loadComponent:() => import('./transactions/transactions.component').then(mod => mod.TransactionsComponent)},
            {
                path:'customers',
                loadComponent:() => import('./customers/customers.component').then(mod => mod.CustomersComponent),
                resolve: {
                    customer: CustomerResolver,
                }
            },
            {path:'customers/:id', loadComponent:() => import('./customers/components/selected-customer/selected-customer.component').then(mod => mod.SelectedCustomerComponent)},
        ]
    },
]