import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersTableComponent } from 'src/app/dashboard/shared/components/customers-table/customers-table.component';

@Component({
  selector: 'app-selected-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomersTableComponent],
  templateUrl: './selected-customer.component.html',
  styleUrls: ['./selected-customer.component.scss']
})
export class SelectedCustomerComponent implements OnInit {
  searchText: string = '';
  filteredTableData: any[] = [];

  tableData: any[] = [
    {
      title: '1',
      mobile: '123-456-7890',
      date: '2023-09-15',
      time: '14:30',
    },
    {
      title: '2',
      mobile: '987-654-3210',
      date: '2023-09-17',
      time: '10:00',
    },{
      title: '2',
      mobile: '987-654-3210',
      amount: '$200',
      date: '2023-09-17',
      time: '10:00',
    },

  ];

  ngOnInit(): void {
    this.filteredTableData = this.tableData.slice();

  }

 

filterData() {

// Apply search filter
if (this.searchText) {
  const searchTextLower = this.searchText.toLowerCase();
  this.filteredTableData = this.filteredTableData.filter(item =>
    item.title.toLowerCase().includes(searchTextLower) ||
    item.mobile.toLowerCase().includes(searchTextLower) ||
    item.amount.toLowerCase().includes(searchTextLower) ||
    item.airTimeForPayment.toLowerCase().includes(searchTextLower) ||
    item.status.toLowerCase().includes(searchTextLower) ||
    item.airTimeStatus.toLowerCase().includes(searchTextLower) ||
    item.date.toLowerCase().includes(searchTextLower) ||
    item.time.toLowerCase().includes(searchTextLower) ||
    item.receiptNumber.toLowerCase().includes(searchTextLower)
  );
}
}

}
