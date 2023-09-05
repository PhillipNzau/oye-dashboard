import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router: Router
  ) {}
  activeRoute:string ='';

  isRouteActive(routePath:string):boolean {
    this.activeRoute = this.router.url
    return this.router.url == routePath
  }

}
