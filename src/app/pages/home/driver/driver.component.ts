import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DriverService } from './driver.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss',
  providers: [DriverService],
})
export class DriverComponent {
  private subscriptions = new Subscription();

  services = inject(DriverService);

  constructor() {}
}
