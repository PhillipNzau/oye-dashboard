import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-paginated-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ],
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent {
  pagedTableData: any[] = []; // Array to hold the paginated data
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
    },

  ];

    // Pagination settings
  config: any = {
    id: 'custom-pagination',
    itemsPerPage: 10,
    currentPage: 1
  };

  onPageChange(page: number) {
    this.config.currentPage = page;
    this.loadPageData();
  }

  loadPageData() {
    const startIndex = (this.config.currentPage - 1) * this.config.itemsPerPage;
    const endIndex = startIndex + this.config.itemsPerPage;
    this.pagedTableData = this.tableData.slice(startIndex, endIndex);
  }

}
