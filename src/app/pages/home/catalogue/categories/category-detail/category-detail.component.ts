import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TreeNodeComponent } from '../../../../../shared/components/tree-node/tree-node.component';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryData } from '../../../../../shared/interfaces/category.interface';
import { FileUploadService } from '../../../../../shared/services/file-upload.service';

interface TreeNode {
  title: string;
  level: number;
  subCategory: TreeNode[];
}

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    TabViewModule,
    TreeNodeComponent,
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  categoryForm!: FormGroup;
  uploadedImage: string = '';
  selectedFile: File | null = null;
  categoryId: string | null = null;
  categoryData!: CategoryData;
  mainImage: string | null = null; // Main image URL
  cancelDialog: boolean = false;
  tree: TreeNode[] = [];

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
    private imageService: FileUploadService
  ) {}

  ngOnInit() {
    this.buildFrom();

    this.categoryId = this.route.snapshot.paramMap.get('id');

    if (this.categoryId) return this.getData(this.categoryId);
  }

  // Add a new root node (parent)
  addRootNode() {
    const newNode: TreeNode = {
      title: `New Subcategory`,
      subCategory: [],
      level: 1,
    };
    this.tree.push(newNode);
  }

  // Add a child node to a specific parent
  addChildToNode(event: { parentNode: TreeNode; childName: string }) {
    if (event.parentNode.level < 2) {
      const newChild: TreeNode = {
        title: event.childName,
        level: event.parentNode.level + 1, // Child level is 1 higher than parent level
        subCategory: [],
      };
      event.parentNode.subCategory.push(newChild);
    } else {
      alert('Cannot add more than three levels!');
    }
  }

  // ---------create categories ------------------//
  buildFrom() {
    this.categoryForm = this.fb.group({
      image: [''],
      _id: [''],
      title: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      description: ['', [Validators.required]],
      visibility: [false, [Validators.required]],
      publishDate: ['', [Validators.required]],
      // productCount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      maximumDiscount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      featuredCategory: [false],

      subCategory: [[]],
    });
  }

  get f() {
    return this.categoryForm.controls;
  }

  isError(controlName: string, error: string): boolean {
    const control = this.categoryForm.get(controlName);
    return !!(control?.errors && control.errors[error] && control.touched);
  }

  // Submit function
  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    const sub = this.service
      .createCategory(this.categoryForm.value)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Category has been Created',
        });

        this.patchData(data);
      });

    this.subscriptions.add(sub);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is < 10
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is < 10
    return `${year}-${month}-${day}`;
  }

  // Trigger the hidden file input
  triggerFileInput(): void {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  // Handle image selection
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file; // Store the file for later use

      const reader = new FileReader();

      reader.onload = () => {
        // Set the uploaded image as the preview source
        this.uploadedImage = reader.result as string;
      };

      reader.readAsDataURL(file); // Read the file to generate the preview

      this.onImageUpload(this.selectedFile);
    }
  }

  onImageUpload(file: any) {
    const formData = new FormData();

    const imageFile: any = file; // Assuming `selectedFile` holds the image file selected by the user
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name); // 'image' is the field name for multer
    }

    const sub = this.imageService.imageUplaod(formData).subscribe(({ url }) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Image uploaded successfully',
      });

      this.categoryForm.patchValue({
        image: url,
      });

      this.onSubmit();
    });

    this.subscriptions.add(sub);
  }

  getAllDataFromNode(node: TreeNode): any {
    const nodeData = {
      title: node.title,
      level: node.level,
      subCategory: node.subCategory.map((child) =>
        this.getAllDataFromNode(child)
      ), // Recursively get subCategory data
    };
    return nodeData;
  }

  // Method to get all data from all nodes in the tree
  getAllData() {
    const allData = this.tree.map((node) => this.getAllDataFromNode(node));

    this.categoryForm.patchValue({
      subCategory: allData,
    });

    const sub = this.service
      .createCategory(this.categoryForm.value)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Category has been Created',
        });

        this.patchData(data);
      });

    this.subscriptions.add(sub);
  }

  getData(_id: string) {
    this.subscriptions.add(
      this.service.getDetails(_id).subscribe(({ data }) => {
        this.categoryData = data;

        this.patchData(data);
      })
    );
  }

  patchData(data: any) {
    this.categoryForm.patchValue(data);

    const publishDate = new Date('2024-01-01T00:00:00.000Z'); // Example date
    const formattedDate = this.formatDate(publishDate);
    this.categoryForm.patchValue({
      publishDate: formattedDate,
    });

    const subCategoryValue = this.categoryForm.get('subCategory')?.value;

    if (subCategoryValue && subCategoryValue.length > 0) {
      // If subCategory is not empty, assign it to another variable
      this.tree = subCategoryValue;
    } else {
      this.tree = []; // Assign empty array if subCategory is empty
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
