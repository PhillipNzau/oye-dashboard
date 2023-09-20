import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { CustomerEntityService } from "../ngrx-store/customer/customer.entity.service";



@Injectable({
    providedIn: "root"
})
export class CustomerResolver implements Resolve<boolean> {
    constructor(
        private customerService: CustomerEntityService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.customerService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.customerService.getAll();
                }
            })
        )
    }
}