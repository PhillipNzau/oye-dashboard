import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersTableComponent } from 'src/app/dashboard/shared/components/customers-table/customers-table.component';
import { TransactionsTableComponent } from "../../../shared/components/transactions-table/transactions-table.component";
import { SelectedCustomerService } from 'src/app/dashboard/shared/services/selected-customer.service';

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

  tableData: any[] = [
    {
      title: '1',
      airtimeFor: '123-456-7890',
      amount: '200',
      date: '2021-09-15',
      time: '14:30',
      receiptNumber: 'R230828.1910.220004'
    },
    {
      title: '2',
      airtimeFor: '222-456-7890',
      amount: '300',
      date: '2022-09-15',
      time: '14:30',
      receiptNumber: 'R230828.1910.220004'
    },{
      title: '3',
      airtimeFor: '33-456-7890',
      amount: '100',
      date: '2023-09-15',
      time: '14:30',
      receiptNumber: 'R230828.1910.220004'
    },

  ];

  constructor(
    private selectedCustomerService: SelectedCustomerService
  ){}

  ngOnInit(): void {
    this.filteredTableData = this.tableData.slice();
    this.getCustomerTransactions()
  }

  getCustomerTransactions() {
    this.selectedCustomerService.getCustomer('738595899').subscribe({
      next: (data:any) => {
        console.log('data', data);
        
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
