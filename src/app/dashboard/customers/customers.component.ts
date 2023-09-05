import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { CustomersTableComponent } from "../shared/components/customers-table/customers-table.component";

@Component({
    selector: 'app-customers',
    standalone: true,
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    imports: [CommonModule, FormsModule, CustomersTableComponent, ChartModule]
})
export class CustomersComponent implements OnInit {
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

  ngOnInit(): void {
    this.filteredTableData = this.tableData.slice();

  }

 

filterData() {
  this.filteredTableData = this.tableData.slice();

  // Apply search filter
  if (this.searchText) {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredTableData = this.filteredTableData.filter(item =>
      item.title.toLowerCase().includes(searchTextLower) ||
      item.mobile.toLowerCase().includes(searchTextLower) ||
      item.date.toLowerCase().includes(searchTextLower) ||
      item.time.toLowerCase().includes(searchTextLower)
    );
  }
}

}
