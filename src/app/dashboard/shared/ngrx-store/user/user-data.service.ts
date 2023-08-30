import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { UserEntityService } from "./user.entity.service";



@Injectable({
    providedIn: "root"
})
export class UserResolver implements Resolve<boolean> {
    constructor(
        private userService: UserEntityService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.userService.getAll();
                }
            })
        )
    }
}