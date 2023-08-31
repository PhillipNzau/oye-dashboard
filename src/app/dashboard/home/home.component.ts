import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
    // Add more mock data items here
  ];

}
