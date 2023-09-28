import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TransactionResModel } from 'src/app/auth/models/transactionModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsTableService {
  transactionsUrl = environment.transactionUrl

  constructor(
    private http: HttpClient
  ) {
    
  }

  getFilteredTransaction(filter:string) {
    return this.http.get<TransactionResModel[]>(`${this.transactionsUrl}/${filter}`).pipe(
      map((transaction: TransactionResModel[]) => {
          if(transaction) {
              // @ts-ignore
              localStorage.setItem('links', JSON.stringify(transaction.links))
              // @ts-ignore
              localStorage.setItem('meta', JSON.stringify(transaction.meta))
          } else {
              console.error('Something went wrong getting transactions');
          }
          // console.log('asd', transaction);
          
          // @ts-ignore
          return transaction.data
      })
  )
  }
}
