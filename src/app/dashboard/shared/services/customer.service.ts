import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomersDashboardModel } from '../models/dashboardModel';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customersDashboardUrl = environment.customersDashboardUrl

  constructor(
    private http: HttpClient,
  ) { }

  getCustomerDashboardStats() {
    return this.http.get<CustomersDashboardModel>(this.customersDashboardUrl).pipe(map((stats: CustomersDashboardModel)=> {
      return stats
    }))
  }


}
