import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardModel } from '../models/dashboardModel';

@Injectable({
  providedIn: 'root'
})
export class TransactionDashboardService {

  dashboardUrl =environment.dashboardUrl
  constructor(
    private http: HttpClient
  ) { }

  getDashboardData() {
    return this.http.get<DashboardModel>(this.dashboardUrl).pipe(
      map((dashboard:DashboardModel)=> {
        return dashboard
      })
    )
  }
}
