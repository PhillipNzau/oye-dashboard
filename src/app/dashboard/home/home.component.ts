import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatedTableComponent } from "../shared/components/paginated-table/paginated-table.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule,PaginatedTableComponent]
})
export class HomeComponent {
 

}
