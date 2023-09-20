import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";

@Injectable({
    providedIn: 'root'
})
export class CustomerEntityService extends EntityCollectionServiceBase<any>{
  
    constructor(
      serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient) {
      super('Customer', serviceElementsFactory);
    }  
  }