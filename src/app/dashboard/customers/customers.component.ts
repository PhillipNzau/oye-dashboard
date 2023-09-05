import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersTableComponent } from "../shared/components/customers-table/customers-table.component";

@Component({
    selector: 'app-customers',
    standalone: true,
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    imports: [CommonModule, FormsModule, CustomersTableComponent]
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
