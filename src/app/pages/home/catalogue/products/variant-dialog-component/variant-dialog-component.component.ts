import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { forkJoin, Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Products } from '../../../../../shared/interfaces/product.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-variant-dialog-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './variant-dialog-component.component.html',
  styleUrls: ['./variant-dialog-component.component.scss'],
  providers: [ProductService],
})
export class VariantDialogComponentComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  service = inject(ProductService);
  fb = inject(FormBuilder);
  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);
  messageService = inject(MessageService);

  productOptions: Products[] = [];
  productForm!: FormGroup;
  category: { name: string; code: string }[] = [];
  selectedCategory: 'size' | 'flavour' | 'colour' | null = null;
  selectedProductPrice: { [key: number]: any } = {};

  ngOnInit() {
    this.initializeForm();
    this.loadData();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      item_id: [this.config.data, Validators.required],
      products: this.fb.array([this.createProductGroup()]),
    });

    this.category = [
      { name: 'SIZE', code: 'size' },
      { name: 'FLAVOUR', code: 'flavour' },
      { name: 'COLOUR', code: 'colour' },
    ];
  }

  loadData() {
    this.subscriptions.add(
      forkJoin({
        variantDetails: this.service.getVariantDetails(this.config.data),
        allProducts: this.service.getAllProduct(),
      }).subscribe(({ variantDetails, allProducts }) => {
        this.productOptions = allProducts.data;

        if (variantDetails.data) {
          this.productForm.patchValue({ item_id: this.config.data });
          this.patchVariants(variantDetails.data.products ?? []);
        }
      })
    );
  }

  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  createProductGroup(): FormGroup {
    return this.fb.group({
      product_id: [null, Validators.required],
      variantType: [null, Validators.required],
      variants: ['', Validators.required],
    });
  }

  addProduct() {
    this.products.push(this.createProductGroup());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  patchVariants(variantsData: any[]) {
    this.products.clear();
    variantsData.forEach((variant) => {
      this.products.push(
        this.fb.group({
          product_id: [variant.product_id._id, Validators.required],
          variantType: [variant.variantType, Validators.required],
          variants: [variant.variants, Validators.required],
        })
      );
    });
  }

  onSelectedProduct(event: any, index: number): void {
    const selectedProduct: any = this.productOptions.find(
      (item) => item._id === event.value
    );

    this.selectedProductPrice[index] = selectedProduct;
  }

  onSelectCategory(event: any, index: number): void {
    this.selectedCategory = event.value;
    const selectedProduct = this.selectedProductPrice[index];
    const productGroup = this.products.at(index);

    if (this.selectedCategory && selectedProduct && productGroup) {
      const value = selectedProduct[this.selectedCategory] || '';
      productGroup.patchValue({ variants: value });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.subscriptions.add(
      this.service
        .CreateVariantProduct(this.productForm.value)
        .subscribe(({ message }) => {
          this.messageService.add({ severity: 'success', summary: message });
          this.closeDialog();
        })
    );
  }

  closeDialog() {
    this.ref.close({ success: true, data: this.productForm.value });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
