import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TransactionResModel } from 'src/app/auth/models/transactionModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectedCustomerService {
  customerUrl = environment.customersUrl

  constructor(
    private http: HttpClient,
  ) { }

  getCustomer(customerNumber:any) {
    return this.http.get<TransactionResModel[]>(`${this.customerUrl}/${customerNumber}`).pipe(
      map((transaction: TransactionResModel[]) => {
        if(transaction) {
          // @ts-ignore
          localStorage.setItem('scLinks', JSON.stringify(transaction.links))
          // @ts-ignore
          localStorage.setItem('scMeta', JSON.stringify(transaction.meta))
      } else {
          console.error('Something went wrong getting transactions');
      }
      // @ts-ignore
      return transaction.data
      })
    )

  }
}
