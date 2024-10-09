import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    SidebarModule,
  ],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss',
})
export class BannersComponent implements OnInit {
  visible: boolean = false;
  selectedVisibility: string = 'hidden';
  type!: any[];
  categories!: any[];
  bannerForm: FormGroup; // Create a FormGroup instance
  selectedCategory: any; // Track selected category
  selectedSubCategory: any; // Track selected sub-category
  subCategories = [];
  sidebarVisible: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with controls
    this.bannerForm = this.fb.group({
      title: [''], // For Title input
      alt: [''], // For Alt input
      selectedCity: [null], // For Banner Type dropdown
      selectedVisibility: [''], // For visibility radio buttons
      selectedCategory: [null], // For Category dropdown
      selectedSubCategory: [null], // For SubCategory dropdown
    });
  }

  ngOnInit() {
    this.addData();
  }

  showDialog() {
    this.visible = true;
  }

  addData() {
    this.categories = [
      {
        name: 'Strength Training',
        code: 'ST',
        subCategories: [
          { name: 'Dumbbells', code: 'DB' },
          { name: 'Barbells', code: 'BB' },
          { name: 'Kettlebells', code: 'KB' },
        ],
      },
      {
        name: 'Cardio Equipment',
        code: 'CE',
        subCategories: [
          { name: 'Treadmills', code: 'TM' },
          { name: 'Elliptical Machines', code: 'EM' },
          { name: 'Exercise Bikes', code: 'EB' },
        ],
      },
      // Add other categories here
    ];

    this.type = [
      { name: 'Main ', code: 'NY' },
      { name: 'Sub ', code: 'RM' },
      { name: 'Offer ', code: 'LDN' },
    ];
  }

  onVisibilityChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.bannerForm.patchValue({ selectedVisibility: target.value });
  }

  // Handle category change
  onCategoryChange(selectedCategory: any) {
    const category = this.categories.find(
      (cat) => cat.name === selectedCategory
    );
    this.subCategories = category ? category.subCategories : [];
    this.bannerForm.patchValue({ selectedSubCategory: null }); // Reset the sub-category selection
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // This event is triggered when the file reading is complete
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = reader.result; // result contains the image data
      };

      reader.readAsDataURL(file); // Read the image as a data URL
    }
  }
}
