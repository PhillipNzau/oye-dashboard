import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedTableComponent } from "../shared/components/paginated-table/paginated-table.component";
import { UserRes } from 'src/app/auth/models/login';
import { HotToastService } from '@ngneat/hot-toast';
import { TransactionEntityService } from '../shared/ngrx-store/transaction/transaction.entity.service';
import { TransactionModel } from 'src/app/auth/models/transactionModel';
import { TransactionDashboardService } from '../shared/services/transaction-dashboard.service';
import { DashboardModel } from '../shared/models/dashboardModel';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule,PaginatedTableComponent]
})
export class HomeComponent implements OnInit {
    user: UserRes | undefined;
    tableData: TransactionModel[] = []
    isLoading:boolean = true;
    total_sales:number | undefined;
    average_purchase: number | undefined;
    customers:number | undefined;
    balance:number | undefined;
    
    constructor(
    private toastService: HotToastService,
    private transactionService: TransactionEntityService,
    private dashboardService: TransactionDashboardService,
    ){}

    ngOnInit(): void {
      // get and parse user from local Storage
      const loggedInUser = localStorage.getItem('oydUsr')
      if(loggedInUser) {
        this.user=JSON.parse(loggedInUser)
      } else {
        this.toastService.error(`User not found!`) 
      }

      // call get transactions
      this.getTransactions()

      // call dasboard data
      this.getDashboardData()
    }

    // get transactions table data from ngrx store
    getTransactions(){
      if(this.tableData.length < 1) {
        this.isLoading = true;        
      }
      
      this.transactionService.entities$.subscribe({
        next:(res) => {
          this.tableData = res
          if(this.tableData.length > 0) {
            this.isLoading = false;        
          }
        },
        error:(err)=> {
          console.log("Error", err);
          if(this.tableData.length > 0) {
            this.isLoading = false;        
          }
        },
      })
    }

    // get dashboard data
    getDashboardData() {
      this.dashboardService.getDashboardData().subscribe({
        next: (data:DashboardModel) => {
          this.total_sales = data.total_sales;
          this.average_purchase = data.average_purchase;
          this.balance = data.balance;
          this.customers = data.customers;
          

        },
        error: (error) => {
          console.log('err', error);
          
        }
      })
    }
 

}
