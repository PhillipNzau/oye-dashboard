import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedTableComponent } from "../shared/components/paginated-table/paginated-table.component";
import { FormsModule } from '@angular/forms';
import { TransactionModel } from 'src/app/auth/models/transactionModel';
import { TransactionEntityService } from '../shared/ngrx-store/transaction/transaction.entity.service';

@Component({
    selector: 'app-transactions',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
    imports: [CommonModule, PaginatedTableComponent, FormsModule]
})
export class TransactionsComponent implements OnInit {
  tableData: TransactionModel[] = []
  isLoading:boolean = true;
  selectedStatus: string = 'all';
  searchText: string = '';
  filteredTableData: TransactionModel[] = [];

  constructor(private transactionService: TransactionEntityService
    ){}

  ngOnInit(): void {
     // call get transactions
     this.getTransactions()
  }

   // get transactions table data from ngrx store
   getTransactions(){
    if(this.tableData.length < 1) {
      this.isLoading = true;        
    }
    
    this.transactionService.entities$.subscribe({
      next:(res) => {
        this.tableData = res
        this.filteredTableData = this.tableData.slice();
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
     

  filterData() {
    // Apply filter based on selectedStatus
    if (this.selectedStatus === 'all') {
      this.filteredTableData = this.tableData.slice();
    } else {
      this.filteredTableData = this.tableData.filter(item => 
        item.payment_status === this.selectedStatus ||
        item.airtime_status === this.selectedStatus
        );
    }

    // Apply search filter
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredTableData = this.filteredTableData.filter(item =>
        item.mobile.toLowerCase().includes(searchTextLower) ||
        item.amount.toLowerCase().includes(searchTextLower) ||
        item.date.toLowerCase().includes(searchTextLower) ||
        item.receipt_number.toLowerCase().includes(searchTextLower)
      );
    }
  }

  // Filter table with the status tabs
  selectItem(item: string) {
    this.selectedStatus = item;
    this.filterData()
  }

}
