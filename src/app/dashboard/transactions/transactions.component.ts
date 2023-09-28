import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedTableComponent } from "../shared/components/paginated-table/paginated-table.component";
import { FormsModule } from '@angular/forms';
import { TransactionModel } from 'src/app/auth/models/transactionModel';
import { TransactionEntityService } from '../shared/ngrx-store/transaction/transaction.entity.service';
import { TransactionsTableService } from '../shared/services/transactions-table.service';

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

  constructor(
    private transactionService: TransactionEntityService,
    private transactionFilterService: TransactionsTableService
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
        this.filteredTableData = this.tableData
        
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
      this.getTransactions()
    } else {
      this.filteredTableData = this.tableData
    }

    // Apply search filter
    if (this.searchText) {
      console.log(this.tableData);
      
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredTableData = this.tableData.filter(item =>
        (item.mobile && item.mobile.toString().toLowerCase().includes(searchTextLower)) ||
        (item.amount && item.amount.toString().toLowerCase().includes(searchTextLower)) ||
        (item.date && item.date.toString().toLowerCase().includes(searchTextLower)) ||
        (item.receipt_number && item.receipt_number.toString().toLowerCase().includes(searchTextLower))
      );
    }
  }

  // Filter table with the status tabs
  selectItem(item: string) {
    
    this.selectedStatus = item;
    this.transactionFilterService.getFilteredTransaction(item).subscribe({
      next: (data) => {
      this.tableData = data;
      this.filterData()
     
      },
      error: (error) => {
        console.log('error getting transaction filter data', error);
      }
    });
    

  }


}
