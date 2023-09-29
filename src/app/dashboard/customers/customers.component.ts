import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { CustomersTableComponent } from "../shared/components/customers-table/customers-table.component";
import { CustomerEntityService } from '../shared/ngrx-store/customer/customer.entity.service';
import { CustomerModel } from 'src/app/auth/models/customersModel';
import { BarData, CustomersDashboardModel } from '../shared/models/dashboardModel';
import { CustomerService } from '../shared/services/customer.service';

@Component({
    selector: 'app-customers',
    standalone: true,
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    imports: [CommonModule, FormsModule, CustomersTableComponent, ChartModule]
})
export class CustomersComponent implements OnInit {
  isLoading:boolean = true;
  isDashLoading:boolean = true;
  tableData: CustomerModel[] = [];

  searchText: string = '';
  filteredTableData: any[] = [];

  // Charts
  chart: Chart | undefined


  // dashboardData:CustomerDashboardModel = {}
  airtimeCustomers: number | undefined;
  totalCustomers: number | undefined;
  barData: BarData | undefined;
  chartMonths: string[] = [];
  chartData: number[] = [];



  constructor(
    private customerService: CustomerEntityService,
    private customerDashboardService: CustomerService
  ){
    
  }

  ngOnInit(): void {

    // get customers
    this.getCustomers()

    //get customer dash stats
    this.getCustomerDashboardStats()
  }

  // get customers table data from ngrx store
  getCustomers(){      
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

     // get customer dashboard data
  getCustomerDashboardStats() {
   
    this.customerDashboardService.getCustomerDashboardStats().subscribe({
      next: (stats:CustomersDashboardModel) => {
        this.totalCustomers = stats.total_customers;
        this.airtimeCustomers = stats.airtime_customers;
        this.barData = stats.bar_data
        this.chartMonths = this.barData.categories;
        this.chartData = this.barData.data;        
        this.chart = new Chart({
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
              categories: this.chartMonths,
            },
            yAxis: {
              title: {
                text: 'Value',
              },
            },
          series: [
            {
              name: 'TXN',
              data: this.chartData,
            } as any
          ],
          plotOptions: {
            column: {
              pointWidth: 30 // Adjust the width here as needed
            }
          },
        });
        
        // once all data is loaded, disable loading
        this.isDashLoading = false
        
      },
      error: (error) => {
        console.log('errors getting customer dashboard stats', error);
        
      }
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
