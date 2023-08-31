import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [CommonModule, RouterOutlet, NavbarComponent]
})
export class DashboardComponent {
    isMenuOpen:boolean = true;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

}