import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersTableComponent } from 'src/app/dashboard/shared/components/customers-table/customers-table.component';
import { TransactionsTableComponent } from "../../../shared/components/transactions-table/transactions-table.component";
import { SelectedCustomerService } from 'src/app/dashboard/shared/services/selected-customer.service';
import { TransactionModel } from 'src/app/auth/models/transactionModel';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerDashboardModel } from 'src/app/dashboard/shared/models/dashboardModel';

@Component({
    selector: 'app-selected-customer',
    standalone: true,
    templateUrl: './selected-customer.component.html',
    styleUrls: ['./selected-customer.component.scss'],
    imports: [CommonModule, FormsModule, CustomersTableComponent, TransactionsTableComponent,RouterModule]
})
export class SelectedCustomerComponent implements OnInit {
  // loading states
  isLoading:boolean = true;
  isDashLoading:boolean = true;

  customerNumber: string | null | undefined;

  searchText: string = '';
  filteredTableData: any[] = [];

  tableData: TransactionModel[]=[];

  // stats data
  totalSpent: number |undefined;
  otherNumbers: number |undefined;
  highestSpent: number |undefined;
  lowestSpent: number | undefined;
  averageSpent: number | undefined;

  constructor(
    private selectedCustomerService: SelectedCustomerService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.customerNumber = this.route.snapshot.paramMap.get('id');
    
    if(this.customerNumber) {
      this.getCustomerTransactions(this.customerNumber)
      this.getCustomerStats(this.customerNumber)
    }

  }

  // Get customer transactions
  getCustomerTransactions(customerNumber:string) {
    this.selectedCustomerService.getCustomer(customerNumber).subscribe({
      next: (data:any) => {
        this.tableData= data;
        this.filteredTableData = this.tableData.slice();
        if(this.tableData.length > 0) {
          this.isLoading = false;        
        }
      },
      error: (error) => {
        console.log('err', error);
        
      }
    })
  }

  // Get customer stats data
  getCustomerStats(customerNumber:string) {
    this.selectedCustomerService.getCustomerDashboardStats(customerNumber).subscribe({
      next: (stats:CustomerDashboardModel) => {
        this.totalSpent = stats.total_spent;
        this.otherNumbers = stats.other_numbers;
        this.highestSpent = stats.highest_spent;
        this.lowestSpent = stats.lowest_spent
        this.averageSpent = stats.average

        if(this.averageSpent) {
          this.isDashLoading = false;        
        }
        
      },
      error: (error) => {
        console.log('error getting selected customer stats', error);
        
      }
    })
  }

filterData() {
  this.filteredTableData = this.tableData.slice();

  // Apply search filter
  if (this.searchText) {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredTableData = this.filteredTableData.filter(item =>
      item.title.toLowerCase().includes(searchTextLower) ||
      item.airtimeFor.toLowerCase().includes(searchTextLower) ||
      item.amount.toLowerCase().includes(searchTextLower) ||
      item.date.toLowerCase().includes(searchTextLower) ||
      item.time.toLowerCase().includes(searchTextLower) ||
      item.receiptNumber.toLowerCase().includes(searchTextLower)
    );
  }
}

}
