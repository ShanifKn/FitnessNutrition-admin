import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormArray, FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { ProductService } from '../products/product.service';
import { ComboProduct, Products } from '../../../../shared/interfaces/product.interface';
import { RatingModule } from 'primeng/rating';
import { FileUploadService } from '../../../../shared/services/file-upload.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-combo-product',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    SearchPipe, RatingModule, FormsModule, SidebarModule, DropdownModule, CalendarModule, MultiSelectModule, DatePipe, ReactiveFormsModule
  ],
  templateUrl: './combo-product.component.html',
  styleUrl: './combo-product.component.scss',
  providers: [ProductService],
})
export class ComboProductComponent implements OnDestroy {
  productList: Products[] = [];
  searchText: string = '';
  sidebarVisible: boolean = false;
  comboForm!: FormGroup;
  cities: any[] | undefined;
  imagePreview: string | ArrayBuffer | null = null;
  selectedCity: any | undefined;
  comboProduct: ComboProduct[] = []

  itemsPerPage: number = 10;

  private subscriptions = new Subscription();
  productServices = inject(ProductService);

  constructor(
    private fb: FormBuilder,
    private imageService: FileUploadService,
    private messageService: MessageService,
  ) {
    this.formBuild()
    this.getData()
  }

  formBuild() {
    this.comboForm = this.fb.group({
      _id: [''],
      title: ['', [Validators.required]],
      description: [''],
      rating: [null, [Validators.min(0), Validators.max(5)]],
      productTotal: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      discount: [null, [Validators.min(0)]],
      image: [null, [Validators.required]],
      products: this.fb.array([]) // FormArray to handle multiple products dynamically
    });
    this.addProduct()
  }

  getData() {
    this.subscriptions.add(
      forkJoin({
        products: this.productServices.getProduct(),
        comboProducts: this.productServices.getComboProducts()
      }).subscribe(({ products, comboProducts }) => {
        this.productList = products.data;
        this.comboProduct = comboProducts.data;

      })
    );
  }

  // Correct getter name to match the template
  get products(): FormArray {
    return this.comboForm.get('products') as FormArray;
  }

  addProduct() {
    this.products.push(
      this.fb.group({
        productId: ['', [Validators.required]], // Ensure this matches the template
        quantity: [1, [Validators.required, Validators.min(1)]],
        price: [null, [Validators.required, Validators.min(0)]],
        total: [null, [Validators.required, Validators.min(0)]]
      })
    );
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  onProductSelect(event: any, index: number) {
    const selectedProductId = event.value;
    const selectedProduct: any = this.productList.find(product => product._id === selectedProductId);

    if (selectedProduct) {
      this.products.at(index).patchValue({ price: selectedProduct.rate, total: selectedProduct.rate * 1 });
    }
    this.calculateProductTotal()
  }

  calculateProductTotal() {
    const productArray = this.comboForm.get('products') as FormArray;

    // Calculate sum of product prices
    const total = productArray.controls.reduce((sum, product) => {
      return sum + (product.get('price')?.value || 0);
    }, 0);

    this.comboForm.patchValue({ productTotal: total });
    this.calculateFinalPrice();
  }

  calculateFinalPrice() {
    const productTotal = this.comboForm.get('productTotal')?.value || 0;
    const discountPercent = this.comboForm.get('discount')?.value || 0;

    // Calculate discounted amount
    const discountedAmount = (productTotal * discountPercent) / 100;

    // Set final price after discount
    this.comboForm.patchValue({ price: productTotal - discountedAmount });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
      this.onImageUpload(file);
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

      this.comboForm.patchValue({
        image: url,
      });
    });

    this.subscriptions.add(sub);
  }


  patchData(combo: any) {
    this.comboForm.patchValue({
      _id: combo._id || '',
      title: combo.title || '',
      description: combo.description || '',
      rating: combo.rating || null,
      productTotal: combo.products.reduce((acc: any, item: any) => acc + item.total, 0) || 0,
      price: combo.price || null,
      discount: combo.discount || 0,
      image: combo.image || ''
    });


    this.imagePreview = combo.image

    // Clear existing form array
    this.products.clear();

    // Patch the products array
    combo.products.forEach((product: any) => {
      this.products.push(
        this.fb.group({
          productId: product.productId._id || '', // Handle population or direct ID
          quantity: product.quantity || 1,
          price: product.price || 0,
          total: product.total || 0
        })
      );
    });

    this.sidebarVisible = true;

    // Recalculate the final price
    this.calculateFinalPrice();
  }




  onSubmit() {

    if (this.comboForm.invalid) {
      return
    }

    this.subscriptions.add(
      this.productServices.CreateComboProduct(this.comboForm.value).subscribe(({ data }) => {


        const index = this.comboProduct.findIndex(combo => combo._id === data._id);


        if (index !== -1) {
          // If driver exists, update the record
          this.comboProduct[index] = { ...this.comboProduct[index], ...data };
        } else {
          // If not found, add new driver
          this.comboProduct = [...this.comboProduct, data];
        }


        this.sidebarVisible = false;

      })
    )

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
