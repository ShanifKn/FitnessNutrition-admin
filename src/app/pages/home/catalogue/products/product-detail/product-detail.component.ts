import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ImageUploadComponent } from '../../../../../shared/components/image-uploader/image-uploader.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Products } from '../../../../../shared/interfaces/product.interface';
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
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [ProductService],
})
export class ProductDetailComponent implements OnDestroy {
  @ViewChild('chipInput') chipInputRef: ElementRef | undefined;

  productId: string | null = null;
  product!: Products;
  productForm!: FormGroup;

  private subscriptions = new Subscription();
  categories: CategoryData[] = [];
  chipInputValue: string = 'asdfasdfasdf';

  selectedParentCategory: any = null;
  selectedCategory: any = null;
  selectedSubCategory: any = null;
  filteredCategories: any[] = [];
  filteredSubCategories: any[] = [];

  cities!: City[];
  payment!: City[];
  branchList!: any[];
  analytics!: any[];
  variants!: any[];
  text: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService,
    public _location: Location
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.getCategoryData();

    if (this.productId) {
      this.getData(this.productId);
    }

    this.buildForms();

    this.payment = [
      { name: 'Tabby', code: 'NY' },
      { name: 'Tamara', code: 'RM' },
      { name: 'Cash on delivery', code: 'LDN' },
    ];

    this.analytics = [
      { name: 'Top sellers', code: 'NY' },
      { name: 'Daily best sellers', code: 'RM' },
      { name: 'Trending', code: 'LDN' },
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
      subCategory: [''],
      analytics: [[]],
      paymentMethods: [[], Validators.required],
      publishDate: ['', Validators.required],
      variants: this.fb.array([]),
      additionals: this.fb.array([]),
      rating: [''],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // Marks all controls as touched to trigger validation
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

  getData(_id: string) {
    this.subscriptions.add(
      this.service.getDetails(_id).subscribe(({ data }) => {
        this.product = data;

        const parentCategory = this.product.parentCategory || [];

        if (parentCategory.length > 0) {
          // Find the parent category by its _id
          this.selectedParentCategory = this.categories.find(
            (cat) => cat._id === this.product.parentCategory
          );

          console.log(this.selectedParentCategory);

          // Filter categories based on parent category
          this.filteredCategories =
            this.selectedParentCategory.subCategory || [];

          this.selectedCategory = this.filteredCategories.find(
            (cat: any) => cat._id === this.product.category
          );

          // Filter subcategories based on selected category
          this.filteredSubCategories = this.selectedCategory?.subCategory || [];
          this.selectedSubCategory = this.filteredSubCategories.find(
            (cat: any) => cat._id === this.product.subCategory
          );
        }
        // Patch the form with the response data
        this.productForm.patchValue({
          _id: this.productId,
          images: this.product.images || [null, null, null, null],
          name: this.product.name || '',
          description: this.product.description || '',
          additionalDescription: this.product.additionalDescription || '',
          purchase_account_name: this.product.purchase_account_name || '',
          available_stock: this.product.available_stock || '',
          actual_available_stock: this.product.actual_available_stock || '',
          chips: this.product.chips || [],
          status: this.product.visibility || 'active',
          stock_on_hand: this.product.stock_on_hand || '',
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
            : '',
        });

        const variants = this.product?.variants || [];
        const additional = this.product.additionals || [];

        this.patchChips(this.product.chips || []);

        if (variants.length > 0) {
          this.patchVariants(this.product.variants ?? []);
        } else {
          this.addVariant();
        }

        if (additional.length > 0) {
          this.patchAddition(this.product.additionals ?? []);
        } else {
          this.addAdditional();
        }
      })
    );
  }

  ///---------------------------------------------------------    category section  -----------------------------------------------------//

  getCategoryData() {
    this.subscriptions.add(
      this.categoryService.getData().subscribe(({ data }) => {
        this.categories = data;
        this.filteredCategories = data;
      })
    );
  }

  // Triggered when a parent category is selected// Triggered when a parent category is selected
  onParentCategoryChange() {
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

  // Get the form array of variants
  get variant() {
    return this.productForm.get('variants') as FormArray;
  }

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

  removeVariant(index: number) {
    this.variant.removeAt(index);
  }

  addVariant() {
    this.variant.push(
      this.fb.group({
        variant: [''],
        size: [''],
        availableStock: [''],
      })
    );
  }

  addAdditional() {
    this.additionals.push(
      this.fb.group({
        key: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  patchVariants(variantsData: any[]) {
    this.variant.clear(); // Clear existing form array

    variantsData.forEach((variant) => {
      this.variant.push(
        this.fb.group({
          variant: [variant.variant],
          size: [variant.size],
          availableStock: [variant.availableStock, ,],
        })
      );
    });
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

  ngOnDestroy() {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();
  }
}
