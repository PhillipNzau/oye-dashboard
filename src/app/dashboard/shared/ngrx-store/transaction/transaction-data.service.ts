import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions, QueryParams } from "@ngrx/data/src/dataservices/interfaces";
import { Observable, map } from "rxjs";
import { TransactionModel, TransactionResModel } from "src/app/auth/models/transactionModel";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root',
})
export class TransactionDataService extends DefaultDataService<any> {

    transactionUrl = environment.transactionUrl

    constructor(
        http:HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
    ){
        super('Transaction', http, httpUrlGenerator)
    }

    override getAll(options?: HttpOptions | undefined): Observable<any[]> {
        return this.http.get<TransactionResModel[]>(this.transactionUrl).pipe(
            map((transaction: TransactionResModel[]) => {
                if(transaction) {
                    // @ts-ignore
                    localStorage.setItem('links', JSON.stringify(transaction.links))
                    // @ts-ignore
                    localStorage.setItem('meta', JSON.stringify(transaction.meta))
                } else {
                    console.error('Something went wrong getting transactions');
                }
                // @ts-ignore
                return transaction.data
            })
        )
    }

    override getWithQuery(customUrl: string): Observable<any[]> {
        return this.http.get<any[]>(customUrl).pipe(
            map((transaction: TransactionResModel[]) => {
                if(transaction) {
                    // @ts-ignore
                    localStorage.setItem('transactionLinks', JSON.stringify(transaction.links))
                    // @ts-ignore
                    localStorage.setItem('transactionMeta', JSON.stringify(transaction.meta))
                } else {
                    console.error('Something went wrong getting transactions');
                }
                // @ts-ignore
                return transaction.data
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