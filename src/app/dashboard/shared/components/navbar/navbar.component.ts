import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{
  @Output() triggerMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSmallScreen: boolean = false;
  constructor(
    private router: Router
  ) {}
  activeRoute:string ='';


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {    
    this.isSmallScreen = window.innerWidth <= 768; // Adjust breakpoint as needed
  }

  ngOnInit(): void {
    this.checkScreenSize()
  }

  trigger() {
    if (this.isSmallScreen) {
      this.triggerMenu.emit(false)
    }
  }

  isRouteActive(routePath:string):boolean {
    this.activeRoute = this.router.url
    return this.router.url == routePath
  }

}
