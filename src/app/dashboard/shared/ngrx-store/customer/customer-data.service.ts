import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions, QueryParams } from "@ngrx/data/src/dataservices/interfaces";
import { Observable, map } from "rxjs";
import { CustomerResModel } from "src/app/auth/models/customersModel";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root',
})
export class CustomerDataService extends DefaultDataService<any> {

    customersUrl = environment.customersUrl

    constructor(
        http:HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        private route: Router
    ){
        super('Customer', http, httpUrlGenerator)
    }

    override getAll(options?: HttpOptions | undefined): Observable<any[]> {
        return this.http.get<CustomerResModel[]>(this.customersUrl).pipe(
            map((customer: CustomerResModel[]) => {
                if(customer) {
                    // @ts-ignore
                    localStorage.setItem('customerLinks', JSON.stringify(customer.links))
                    // @ts-ignore
                    localStorage.setItem('customerMeta', JSON.stringify(customer.meta))
                } else {
                    console.error('Something went wrong getting customers');
                }
                // @ts-ignore
                return customer.data
            })
        )
    }

    override getWithQuery(customUrl: string): Observable<any[]> {
        return this.http.get<any[]>(customUrl).pipe(
            map((customer: CustomerResModel[]) => {
                if(customer) {
                    // @ts-ignore
                    localStorage.setItem('links', JSON.stringify(customer.links))
                    // @ts-ignore
                    localStorage.setItem('meta', JSON.stringify(customer.meta))
                } else {
                    console.error('Something went wrong getting customers');
                }
                // @ts-ignore
                return customer.data
            })
        )
        
    }

    // override add(updateData:TransactionModel, options?: HttpOptions | undefined): Observable<any> {
    //     return this.http.post<any>(this.updateTransaction, updateData ).pipe(
    //         map((Transaction:TransactionModel) => {
    //             return Transaction
    //         })
    //     )
    // }
}