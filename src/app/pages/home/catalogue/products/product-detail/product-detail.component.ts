import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ImageUploadComponent } from '../../../../../shared/components/image-uploader/image-uploader.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { forkJoin, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import {
  Products,
  Variant,
} from '../../../../../shared/interfaces/product.interface';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CategoryData } from '../../../../../shared/interfaces/category.interface';
import { CategoryService } from '../../categories/category.service';
import { ChipModule } from 'primeng/chip';
import { RatingModule } from 'primeng/rating';
import { TabViewModule } from 'primeng/tabview';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { VariantDialogComponentComponent } from '../variant-dialog-component/variant-dialog-component.component';
import {
  Analytics,
  Dietary,
  Payment,
} from '../../../../../shared/data/static.data';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    ChipModule,
    EditorModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    ReactiveFormsModule,
    ImageUploadComponent,
    RatingModule,
    CommonModule,
    TabViewModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [ProductService, DialogService],
})
export class ProductDetailComponent implements OnDestroy {
  @ViewChild('chipInput') chipInputRef: ElementRef | undefined;

  productId: string | null = '';
  product: Partial<Products> = {};
  productForm!: FormGroup;

  private subscriptions = new Subscription();
  categories: CategoryData[] = [];
  chipInputValue: string = 'asdfasdfasdf';

  selectedParentCategory: any = null;
  selectedCategory: any = null;
  selectedSubCategory: any = null;
  filteredCategories: any[] = [];
  filteredSubCategories: any[] = [];
  ref: DynamicDialogRef | undefined;

  payment!: City[];
  analytics!: any[];
  variants: any[] = [];
  dietary!: City[];
  text: string | undefined;
  category: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService,
    public _location: Location,
    private dialogService: DialogService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.getDataWithCategories(this.productId);
    }

    this.buildForms();

    this.payment = Payment;
    this.analytics = Analytics;
    this.dietary = Dietary;
    this.category = [
      { name: 'SIZE', code: 'size' },
      { name: 'FLAVOUR', code: 'flavor' },
      { name: 'COLOUR', code: 'colour' },
    ];
  }

  ///---------------------------------------------------------   form build -----------------------------------------------------//

  buildForms() {
    this.productForm = this.fb.group({
      _id: ['', Validators.required],
      images: this.fb.array([null, null, null, null], Validators.required),
      name: ['', Validators.required],
      description: ['', Validators.required],
      additionalDescription: ['', Validators.required],
      purchase_account_name: ['', Validators.required],
      available_stock: [0, [Validators.required]],
      actual_available_stock: [0, [Validators.required]],
      chips: this.fb.array([]),
      status: ['', Validators.required],
      stock_on_hand: [0, [Validators.required]],
      rate: [
        0,
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      purchase_rate: [
        0,
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      maxDiscount: [0],
      parentCategory: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      analytics: [[]],
      paymentMethods: [[], Validators.required],
      publishDate: ['', Validators.required],
      additionals: this.fb.array([]),
      rating: [''],
      dietary: [],
      size: ['', Validators.required],
      colour: [''],
      flavour: [''],
      productBrand: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // Marks all controls as touched to trigger validation

      console.log(this.productForm.invalid);

      const errorMessages: any[] = [];

      // Validate individual form controls
      Object.keys(this.productForm.controls).forEach((key) => {
        const controlErrors = this.productForm.get(key)?.errors;
        if (controlErrors) {
          if (controlErrors['required']) {
            errorMessages.push({
              severity: 'error',
              summary: `${key} is required.`,
            });
          }
          if (controlErrors['minlength']) {
            errorMessages.push({
              severity: 'error',
              summary: `${key} must be at least ${controlErrors['minlength'].requiredLength} characters long.`,
            });
          }
          if (controlErrors['maxlength']) {
            errorMessages.push({
              severity: 'error',
              summary: `${key} must be no more than ${controlErrors['maxlength'].requiredLength} characters long.`,
            });
          }
          if (controlErrors['pattern']) {
            errorMessages.push({
              severity: 'error',
              summary: `${key} has an invalid format.`,
            });
          }
        }
      });

      // Validate FormArray (additionals)
      const additionalsArray = this.productForm.get('additionals') as FormArray;
      additionalsArray.controls.forEach((group, index) => {
        const keyErrors = group.get('key')?.errors;
        const valueErrors = group.get('value')?.errors;

        if (keyErrors) {
          if (keyErrors['required']) {
            errorMessages.push({
              severity: 'error',
              summary: `Additional item field is required.`,
            });
          }
        }

        if (valueErrors) {
          if (valueErrors['required']) {
            errorMessages.push({
              severity: 'error',
              summary: `Additional item field is required.`,
            });
          }
        }
      });

      // Use MessageService to display the messages
      errorMessages.forEach((msg) => {
        this.messageService.add(msg);
      });

      return;
    }

    this.subscriptions.add(
      this.service
        .updatePrdouct(this.productForm.value)
        .subscribe(({ message }) => {
          this.messageService.add({
            severity: 'success',
            summary: message,
          });
          this.router.navigate(['/catalogue/products']);
        })
    );
  }

  hasError(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    // Ensure that we return false if the control is null or undefined
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }

  ///---------------------------------------------------------   Get data  -----------------------------------------------------//

  getDataWithCategories(_id: string) {
    const categoryRequest = this.categoryService.getData();
    const productRequest = this.service.getDetails(_id);
    const productVariant = this.service.getVariantDetails(_id);
    const dietary = this.categoryService.getDietary();

    this.subscriptions.add(
      forkJoin([
        categoryRequest,
        productRequest,
        productVariant,
        dietary,
      ]).subscribe(
        ([categoryResponse, productResponse, productVariant, dietary]) => {
          // Handle category data
          this.categories = categoryResponse.data;
          this.filteredCategories = categoryResponse.data;
          this.dietary = dietary.data;

          if (productVariant.data) {
            this.variants = productVariant.data.products || [];
          }

          // Handle product data
          this.product = productResponse.data;

          const parentCategory = this.product.parentCategory || [];

          if (parentCategory.length > 0) {
            this.selectedParentCategory = this.categories.find(
              (cat) => cat._id === this.product.parentCategory
            );

            if (this.selectedParentCategory) {
              this.filteredCategories =
                this.selectedParentCategory.subCategory || [];

              this.selectedCategory = this.filteredCategories.find(
                (cat: any) => cat._id === this.product.category
              );

              this.filteredSubCategories =
                this.selectedCategory?.subCategory || [];

              this.selectedSubCategory = this.filteredSubCategories.find(
                (cat: any) => cat._id === this.product.subCategory
              );
            }
          }

          this.productForm.patchValue({
            _id: this.productId,
            images: this.product.images || [null, null, null, null],
            name: this.product.name || '',
            description: this.product.description || '',
            additionalDescription: this.product.additionalDescription || '',
            purchase_account_name: this.product.purchase_account_name || '',
            available_stock: this.product.available_stock || 0,
            actual_available_stock: this.product.actual_available_stock || 0,
            chips: this.product.chips || [],
            status: this.product.status || 'active',
            stock_on_hand: this.product.stock_on_hand || 0,
            rate: this.product.rate || '',
            purchase_rate: this.product.purchase_rate || '',
            maxDiscount: this.product.maxDiscount || '',
            parentCategory: this.product.parentCategory || '',
            category: this.product.category || '',
            subCategory: this.product.subCategory || '',
            analytics: this.product.analytics || [],
            paymentMethods: this.product.paymentMethods || [],
            rating: this.product.rating || 1,
            publishDate: this.product.publishDate
              ? new Date(this.product.publishDate).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],

            dietary: this.product.dietary || [],
            size: this.product.size || '',
            colour: this.product.colour || '',
            flavour: this.product.flavour || '',
            productBrand: this.product.productBrand || '',
          });

          const additional = this.product.additionals || [];

          this.patchChips(this.product.chips || []);

          if (additional.length > 0) {
            this.patchAddition(this.product.additionals ?? []);
          } else {
            this.addAdditional();
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      )
    );
  }

  ///---------------------------------------------------------    category section  -----------------------------------------------------//

  // Triggered when a parent category is selected// Triggered when a parent category is selected
  onParentCategoryChange() {
    if (!this.selectedParentCategory) {
      this.filteredCategories = [];
      return;
    }

    const selectedCategory = this.categories.find(
      (item) => item._id === this.selectedParentCategory
    );
    // Filter the categories based on the selected parent category
    this.filteredCategories = selectedCategory?.subCategory || [];
    this.selectedCategory = null; // Reset selected category
    this.selectedSubCategory = null; // Reset selected subcategory
  }

  // Method to handle change in Category
  onCategoryChange() {
    const selectedCategory = this.filteredCategories.find(
      (item) => item._id === this.selectedCategory
    );
    // Filter the subcategories based on the selected category
    this.filteredSubCategories = selectedCategory?.subCategory || [];
    this.selectedSubCategory = null; // Reset selected subcategory
  }

  ///---------------------------------------------------------   add remove array from form builds  -----------------------------------------------------//

  // Get the form array of additionals
  get additionals() {
    return this.productForm.get('additionals') as FormArray;
  }

  get chipsControl() {
    return this.productForm.get('chips') as FormArray;
  }

  addChip(): void {
    const inputElement = this.chipInputRef?.nativeElement;
    const value = inputElement.value.trim(); // Get value from the input field

    if (value) {
      // Push the new chip as a FormControl into the FormArray
      this.chipsControl.push(this.fb.control(value));
      inputElement.value = '';
    }
  }

  removeChip(index: number): void {
    const chips = this.chipsControl.value || [];
    chips.splice(index, 1); // Remove chip by index
    this.productForm.setValue(chips); // Update form control
  }

  // Remove a variant
  removeAdditionals(index: number) {
    this.additionals.removeAt(index);
  }

  addAdditional() {
    this.additionals.push(
      this.fb.group({
        key: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  patchChips(data: any) {
    this.chipsControl.clear();

    data.forEach((chip: any) => {
      this.chipsControl.push(this.fb.control(chip));
    });
  }

  patchAddition(data: any[]) {
    this.additionals.clear();

    data.forEach((item) => {
      this.additionals.push(
        this.fb.group({
          key: [item.key],
          value: [item.value],
        })
      );
    });
  }

  ///---------------------------------------------------------   image uploader  -----------------------------------------------------//

  onImagesChange(updatedImages: (string | null)[]): void {
    this.productForm.patchValue({ images: updatedImages }); // Update the form control
  }

  ///---------------------------------------------------------   dialgoue settings  -----------------------------------------------------//

  showDialog() {
    this.ref = this.dialogService.open(VariantDialogComponentComponent, {
      header: 'Add Variant Product',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: this.productId,
    });

    this.ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.getVariantType(this.productId);
      } else {
        return;
      }
    });
  }

  getVariantType(_id: any) {
    this.subscriptions.add(
      this.service.getVariantDetails(_id).subscribe(({ data }) => {
        this.variants = data.products;
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();

    if (this.ref) {
      this.ref.close();
    }
  }
}
