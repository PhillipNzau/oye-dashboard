import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from '../modal/modal.component';
import { TransactionModel } from 'src/app/auth/models/transactionModel';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ModalComponent, RouterModule],
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() selectedStatus: string = '';
  @Input() searchText: string = '';
  @Input() tableData: TransactionModel[] = [] ;

   // modal triggers
   showPendingModal:boolean = false;

   closeModal(): void {
     this.showPendingModal = false;
   }

   pagedTableData: any[] = []; // Array to hold the paginated data


  // Pagination settings
  config: any = {
    id: 'custom-pagination',
    itemsPerPage: 10,
    currentPage: 1
  };

  ngOnInit() {
    // Initially, set filtered data to be the same as tableData
    this.loadPageData();
  }

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
