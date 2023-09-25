import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersTableComponent } from 'src/app/dashboard/shared/components/customers-table/customers-table.component';
import { TransactionsTableComponent } from "../../../shared/components/transactions-table/transactions-table.component";
import { SelectedCustomerService } from 'src/app/dashboard/shared/services/selected-customer.service';
import { TransactionModel } from 'src/app/auth/models/transactionModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-selected-customer',
    standalone: true,
    templateUrl: './selected-customer.component.html',
    styleUrls: ['./selected-customer.component.scss'],
    imports: [CommonModule, FormsModule, CustomersTableComponent, TransactionsTableComponent]
})
export class SelectedCustomerComponent implements OnInit {
  searchText: string = '';
  filteredTableData: any[] = [];

  tableData: TransactionModel[]=[];

  constructor(
    private selectedCustomerService: SelectedCustomerService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if(id) this.getCustomerTransactions(id)

  }

  getCustomerTransactions(id:string) {
    this.selectedCustomerService.getCustomer(id).subscribe({
      next: (data:any) => {
        this.tableData= data;
        
        this.filteredTableData = this.tableData.slice();
      },
      error: (error) => {
        console.log('err', error);
        
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
