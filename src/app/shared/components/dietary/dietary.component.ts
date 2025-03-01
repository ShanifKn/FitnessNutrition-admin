import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../pages/home/catalogue/categories/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dietary',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dietary.component.html',
  styleUrl: './dietary.component.scss',
})
export class DietaryComponent {
  private subscriptions = new Subscription();

  @Input() dietary: any[] = [];
  categoryForm!: FormGroup;

  visible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private messageService: MessageService
  ) {
    this.categoryForm = this.fb.group({
      _id: [''],
      title: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
      // Add your submit logic here
    }
    this.subscriptions.add(
      this.service
        .creeateDietary(this.categoryForm.value)
        .subscribe(({ data }) => {
          const existingIndex = this.dietary.findIndex(
            (item) => item._id === data._id
          );

          if (existingIndex !== -1) {
            // If a match is found, update the item
            this.dietary[existingIndex] = {
              ...this.dietary[existingIndex],
              ...data,
            };
          } else {
            // If no match is found, add the new item to the array
            this.dietary.push(data);
          }

          this.visible = false;
          this.categoryForm.reset();
        })
    );
  }

  updateDietary(data: any) {
    this.categoryForm.patchValue({ _id: data._id, title: data.title });

    this.showDialog();
  }

  onCancel(): void {
    this.categoryForm.reset();
    // Add your cancel logic here
    this.visible = false;
  }

  // Optional: Getter for easy access in template
  get titleControl() {
    return this.categoryForm.get('title');
  }

  showDialog() {
    this.visible = true;
  }
}
