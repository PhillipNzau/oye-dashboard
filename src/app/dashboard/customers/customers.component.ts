import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { CustomersTableComponent } from "../shared/components/customers-table/customers-table.component";
import { CustomerEntityService } from '../shared/ngrx-store/customer/customer.entity.service';
import { CustomerModel } from 'src/app/auth/models/customersModel';

@Component({
    selector: 'app-customers',
    standalone: true,
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    imports: [CommonModule, FormsModule, CustomersTableComponent, ChartModule]
})
export class CustomersComponent implements OnInit {
  isLoading:boolean = true;
  tableData: CustomerModel[] = [];

  searchText: string = '';
  filteredTableData: any[] = [];

  // Charts
  chart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
        text: ''
    },
    
    credits: {
      enabled: false
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        title: {
          text: 'Value',
        },
      },
    series: [
      {
        name: 'Data',
        data: [10, 5, 15, 8, 12, 20, 10,3,8,10,50,60],
      } as any
    ],
    plotOptions: {
      column: {
        pointWidth: 30 // Adjust the width here as needed
      }
    },
  });

  constructor(
    private customerService: CustomerEntityService
  ){}

  ngOnInit(): void {

    // get customers
    this.getCustomers()

  }

    // get customers table data from ngrx store
    getCustomers(){
      if(this.tableData.length < 1) {
        this.isLoading = true;        
      }
      
      this.customerService.entities$.subscribe({
        next:(res) => {
          
          this.tableData = res
          this.filteredTableData = this.tableData.slice();

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
  this.filteredTableData = this.tableData.slice();

  // Apply search filter
  if (this.searchText) {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredTableData = this.filteredTableData.filter(item =>
      item.mobile.toLowerCase().includes(searchTextLower) ||
      item.date.toLowerCase().includes(searchTextLower) ||
      item.time.toLowerCase().includes(searchTextLower)
    );
  }
}

}
