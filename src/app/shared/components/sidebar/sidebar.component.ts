import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isDropdownOpen = false;
  isDropdownSettings = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  toggleSettings() {
    this.isDropdownSettings = !this.isDropdownSettings;
  }
}
