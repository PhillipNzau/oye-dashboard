import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from '../modal/modal.component';
import { LinksModel, MetaModel, TransactionModel } from 'src/app/auth/models/transactionModel';
import { TransactionEntityService } from '../../ngrx-store/transaction/transaction.entity.service';
import { TransactionsTableService } from '../../services/transactions-table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginated-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ModalComponent],
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent implements OnInit  {
  @Input() selectedStatus: string = '';
  @Input() searchText: string = '';
  @Input() tableData: TransactionModel[] = [] ;
  @Output() changeStatus = new EventEmitter<string>();

  // pagination data fom api
  links:string = '';
  currentPage!: number;
  nextPage: any;
  prevPage: string | undefined;
  lastPage: number | undefined;
  totalPages!:number;

  // modal triggers
  showPendingModal:boolean = false;
  pagedTableData: any[] = []; // Array to hold the paginated data
  
  // Pagination settings
  config: any = {
    id: 'custom-pagination',
    itemsPerPage: 10,
    currentPage: 1
  };

  // transaction to check
  transactionCheck: TransactionModel | undefined;
  

  constructor(
    private transactionService: TransactionEntityService,
    private checkTransactionService: TransactionsTableService,
    private route: Router
  ){}

  ngOnInit() {
    const tableLinks = localStorage.getItem('links')
    const tableMeta = localStorage.getItem('meta')
    if(tableMeta) {
      const meta:MetaModel =JSON.parse(tableMeta)
      this.currentPage = meta.current_page      
      this.lastPage= meta.last_page
      this.totalPages=meta.total
    } else {
      // this.toastService.error(`User not found!`) 
    }

    if(tableLinks){
      const links:LinksModel = JSON.parse(tableLinks)
      this.nextPage = links.next
      this.prevPage = links.prev      
    } else {

    }
    // Initially, set filtered data to be the same as tableData
    this.loadPageData();
  }

  onPageChange(page: number) {
    this.getNextPageData()
    this.config.currentPage = page;
    this.loadPageData();
  }

  loadPageData() {
    const startIndex = (this.config.currentPage - 1) * this.config.itemsPerPage;
    const endIndex = startIndex + this.config.itemsPerPage;
    this.pagedTableData = this.tableData.slice(startIndex, endIndex);
  }

  // get next page data
  getNextPageData() {
    this.transactionService.getWithQuery(this.nextPage).subscribe({
      next:(data:any)=> {      
      },
      error:()=> {

      }
    });
  }

  // modal
  openModal(item:TransactionModel):void {
    this.transactionCheck = item
    
    this.showPendingModal = true;
  }
  closeModal(): void {
    this.showPendingModal = false;
  }

  checkTransaction(id:number | undefined) {
    this.checkTransactionService.checkTransaction(id).subscribe({
      next: (data) => {
        if(data.status == 200) {
          this.transactionService.getAll().subscribe();        
          this.changeStatus.emit('all');
          this.closeModal()
        } 
      },
      error: (error) => {

      }
    })

  }
}