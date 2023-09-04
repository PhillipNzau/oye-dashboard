import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  searchText: string = '';
  filteredTableData: any[] = [];

  tableData: any[] = [
    {
      title: '1',
      mobile: '123-456-7890',
      amount: '$100',
      airTimeForPayment: '10 days',
      status: 'Pending',
      airTimeStatus: 'Active',
      date: '2023-09-15',
      time: '14:30',
      receiptNumber: '12345'
    },
    {
      title: '2',
      mobile: '987-654-3210',
      amount: '$200',
      airTimeForPayment: '5 days',
      status: 'Paid',
      airTimeStatus: 'Inactive',
      date: '2023-09-17',
      time: '10:00',
      receiptNumber: '54321'
    },{
      title: '2',
      mobile: '987-654-3210',
      amount: '$200',
      airTimeForPayment: '5 days',
      status: 'Paid',
      airTimeStatus: 'Submitted',
      date: '2023-09-17',
      time: '10:00',
      receiptNumber: '54321'
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
