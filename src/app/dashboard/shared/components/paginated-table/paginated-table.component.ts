import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from '../modal/modal.component';
import { LinksModel, MetaModel, TransactionModel } from 'src/app/auth/models/transactionModel';
import { TransactionEntityService } from '../../ngrx-store/transaction/transaction.entity.service';

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

  // pagination data fom api
  links:string = '';
  currentPage : number | undefined;
  nextPage: any;
  prevPage: string | undefined;
  lastPage: number | undefined;
  totalPages:number| undefined;

  // modal triggers
  showPendingModal:boolean = false;

  constructor(
    private transactionService: TransactionEntityService
  ){}

  closeModal(): void {
    this.showPendingModal = false;
  }

  
  pagedTableData: any[] = []; // Array to hold the paginated data
  

  // Pagination settings
  config: any = {
    id: 'custom-pagination',
    itemsPerPage: 9,
    currentPage: 1
  };

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
}