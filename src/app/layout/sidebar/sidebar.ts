import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth';
import { SIDEBAR_ITEMS } from './sidebar-items';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {

  user: any;

  menuItems: any[] = [];

  constructor(

    private authService: AuthService

  ) {
    
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
  
    const role = this.user?.role;

    this.menuItems = SIDEBAR_ITEMS.filter(
      
      item => item.roles.includes('ALL')
    
      ||

      item.roles.includes(role)
    
    );
  
  }


}
