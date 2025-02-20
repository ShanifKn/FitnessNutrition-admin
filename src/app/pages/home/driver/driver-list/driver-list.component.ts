import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriverService } from '../driver.service';
import { Driver } from '../../../../shared/interfaces/driver.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss',
  providers: [DriverService],
})
export class DriverListComponent implements OnDestroy {
  private subscriptions = new Subscription();
  services = inject(DriverService);
  fb = inject(FormBuilder);

  driverForm!: FormGroup;
  addNewDriver: boolean = false;
  driverList: Driver[] = [];

  constructor() {
    this.getData();
    this.fromBuild();
  }

  fromBuild() {
    this.driverForm = this.fb.group({
      image: ['', [Validators.required]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      whatsappPhone: ['', Validators.required],
      branch: ['', Validators.required],
      location: ['', Validators.required],
      status: [true, Validators.required],
    });
  }

  getData() {
    this.subscriptions.add(
      this.services.getList().subscribe(({ data }) => {
        console.log(data);
        this.driverList = data;
      })
    );
  }

  onSubmit(): void {
    if (this.driverForm.valid) {
      console.log(this.driverForm.value);
    }
  }

  onCancel(): void {
    this.driverForm.reset();
  }

  showDialog() {
    this.addNewDriver = true;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
