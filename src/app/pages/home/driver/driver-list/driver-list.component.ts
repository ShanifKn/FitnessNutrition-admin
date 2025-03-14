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
      image: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      whatappPhone: ['', Validators.required],
      branch: ['', Validators.required],
      location: ['', Validators.required],
      dlNo: [''],
      status: [true, Validators.required],
    });
  }

  getData() {
    this.subscriptions.add(
      this.services.getList().subscribe(({ data }) => {
        this.driverList = data;
      })
    );
  }

  onSubmit(): void {

    if (this.driverForm.invalid) {
      this.driverForm.markAllAsTouched();
      return;
    }

    this.subscriptions.add(
      this.services.create(this.driverForm.value).subscribe(({ data }) => {


        const index = this.driverList.findIndex(driver => driver._id === data._id);

        if (index !== -1) {
          // If driver exists, update the record
          this.driverList[index] = { ...this.driverList[index], ...data };
        } else {
          // If not found, add new driver
          this.driverList = [...this.driverList, data];
        }
        

        this.addNewDriver = false;
      })
    )


  }

  onCancel(): void {
    this.driverForm.reset();
  }

  showDialog() {
    this.addNewDriver = true;
  }


  editDriver(_id: string) {

    this.subscriptions.add(
      this.services.getDetails(_id).subscribe(({ data }) => {

        this.driverForm.patchValue({
          image: data.image || '',
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          whatappPhone: data.whatappPhone || '',
          branch: data.branch || '',
          location: data.location || '',
          dlNo: data.dlNo || '',
          status: data.status || false,
        });


        this.showDialog()
      })
    );
  }

  hasError(controlName: string): boolean {
    const control = this.driverForm.get(controlName);
    // Ensure that we return false if the control is null or undefined
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
