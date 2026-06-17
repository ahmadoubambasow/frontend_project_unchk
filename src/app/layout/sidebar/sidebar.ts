import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth';
import { SIDEBAR_ITEMS } from './sidebar-items';
import { CommonModule } from '@angular/common';
import { MatMenuContent, MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CdkAutofill } from "@angular/cdk/text-field";

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    CdkAutofill
],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {

  user: any;

  menuItems: any[] = [];

  showUserMenu = false;

  constructor(

    private authService: AuthService,

    private router: Router,

    private elementRef: ElementRef

  ) {}

  ngOnInit(): void {

  this.authService.currentUser$
    .subscribe(user => {

      this.user = user;

      const role =
        this.user?.role;

      this.menuItems =
        SIDEBAR_ITEMS.filter(

          item =>

            item.roles.includes('ALL')

            ||

            item.roles.includes(role)
        );
    });
}

  toggleUserMenu(): void {

    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {

    this.showUserMenu = false;
  }

  logoutAndClose() {

    this.showUserMenu = false;
    
    this.logout();
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }

  /**
 * Fermer le menu si clic extérieur
 */
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {

  const clickedInside =
    this.elementRef.nativeElement.contains(
      event.target
    );

  if (!clickedInside) {

    this.showUserMenu = false;
  }
}
}
