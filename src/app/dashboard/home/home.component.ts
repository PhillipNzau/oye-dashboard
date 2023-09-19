import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatedTableComponent } from "../shared/components/paginated-table/paginated-table.component";
import { UserRes } from 'src/app/auth/models/login';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule,PaginatedTableComponent]
})
export class HomeComponent implements OnInit {
    user: UserRes | undefined;
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

    constructor(
    private toastService: HotToastService,

    ){}

    ngOnInit(): void {
      const loggedInUser = localStorage.getItem('oydUsr')
      if(loggedInUser) {
        this.user=JSON.parse(loggedInUser)
        this.toastService.success(`Welcome ${this.user?.first_name}!`) 
      } else {
        this.toastService.error(`User not found!`) 
      }
    }
 

}
