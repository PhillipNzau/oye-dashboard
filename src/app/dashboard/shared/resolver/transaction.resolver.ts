import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { TransactionEntityService } from "../ngrx-store/transaction/transaction.entity.service";



@Injectable({
    providedIn: "root"
})
export class TransactionResolver implements Resolve<boolean> {
    constructor(
        private transactionService: TransactionEntityService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.transactionService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.transactionService.getAll();
                }
            })
        )
    }
}