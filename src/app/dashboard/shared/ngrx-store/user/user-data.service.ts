import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment.development";
// import { UserModel } from "../../models/userModel";

@Injectable({
    providedIn: 'root',
})
export class UserDataService extends DefaultDataService<any> {


    constructor(
        http:HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        private route: Router
    ){
        super('User', http, httpUrlGenerator)
    }

    // override getAll(options?: HttpOptions | undefined): Observable<any[]> {
    //     return this.http.get<any>(this.getUser).pipe(
    //         map((user: any) => {
    //             const users: any[] = [user];
    //             return users
    //         })
    //     )
    // }

    // override add(updateData:UserModel, options?: HttpOptions | undefined): Observable<any> {
    //     return this.http.post<any>(this.updateUser, updateData ).pipe(
    //         map((user:UserModel) => {
    //             return user
    //         })
    //     )
    // }
}