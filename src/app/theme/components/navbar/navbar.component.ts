import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // Method to toggle fullscreen
  toggleFullScreen() {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      // Request fullscreen mode
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
        });
      }
    }
  }
}
