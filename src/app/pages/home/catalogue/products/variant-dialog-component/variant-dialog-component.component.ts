import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { forkJoin, Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Products } from '../../../../../shared/interfaces/product.interface';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  styleUrl: './variant-dialog-component.component.scss',
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
  selectedProduct: any;
  category: any[] | undefined;
  selectedProductPrice: any;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.productForm = this.fb.group({
      item_id: ["", Validators.required],
      products: this.fb.array([this.createProductGroup()]),
    });

    this.category = [
      { name: 'SIZE', code: 'size' },
      { name: 'FLAVOUR', code: 'flavor' },
      { name: 'COLOUR', code: 'colour' },
    ];

    this.subscriptions.add(
      forkJoin({
        variantDetails: this.service.getVariantDetails(this.config.data),
        allProducts: this.service.getAllProduct(),
      }).subscribe(({ variantDetails, allProducts }) => {
        if (variantDetails.data) {
          // Handling variant details
          this.productForm.patchValue({
            item_id: this.config.data,
          });
          this.patchVariants(variantDetails.data.products ?? []);

          // Handling all products
          this.productOptions = allProducts.data;
        } else {
          this.addProduct();
        }
      })
    );
  }

  get products() {
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
    this.products.clear(); // Clear existing form array

    variantsData.forEach((variant) => {
      this.products.push(
        this.fb.group({
          product_id: [variant.product_id._id],
          variantType: [variant.variantType],
          variants: [variant.variants],
        })
      );
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.subscriptions.add(
      this.service
        .CreateVariantProduct(this.productForm.value)
        .subscribe(({ message }) => {
          this.messageService.add({
            severity: 'success',
            summary: message,
          });

          this.closeDialog();
        })
    );
  }

  closeDialog() {
    this.ref.close({ success: true, data: this.productForm.value });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();
  }
}
