import { Component } from '@angular/core';
import { ImageUploaderComponent } from '../../../../../shared/components/image-uploader/image-uploader.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Products } from '../../../../../shared/interfaces/product.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    EditorModule,
    DropdownModule,
    ImageUploaderComponent,
    MultiSelectModule,
    TableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [ProductService],
})
export class ProductDetailComponent {
  productId: string | null = null;
  product!: Products;
  productForm!: FormGroup;

  private subscriptions = new Subscription();

  cities!: City[];
  payment!: City[];
  branchList!: any[];
  analytics!: any[];
  categories!: any[];
  variants!: any[];
  text: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private fb: FormBuilder
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.buildForms();

    this.cities = [
      { name: 'Protein', code: 'NY' },
      { name: 'Whey', code: 'RM' },
      { name: 'Stamina', code: 'LDN' },
    ];

    this.payment = [
      { name: 'Tabby', code: 'NY' },
      { name: 'Tamara', code: 'RM' },
      { name: 'Cash on delivery', code: 'LDN' },
    ];

    this.branchList = [
      {
        branchName: 'Town Centre Al Ain Branch',
        count: 125,
      },
    ];

    this.analytics = [
      { name: 'Top sellers', code: 'NY' },
      { name: 'Daily best sellers', code: 'RM' },
      { name: 'Trending', code: 'LDN' },
    ];

    this.variants = [
      {
        price: '1234',
        size: '500g',
        flavour: 'Chocolate',
        stock: 150,
        exp: '16 Sep 2025',
      },
      {
        price: '999',
        size: '250g',
        flavour: 'Vanilla',
        stock: 200,
        exp: '10 Dec 2024',
      },
      {
        price: '1500',
        size: '1kg',
        flavour: 'Strawberry',
        stock: 100,
        exp: '01 Jan 2026',
      },
      {
        price: '850',
        size: '300g',
        flavour: 'Mango',
        stock: 50,
        exp: '15 Aug 2025',
      },
    ];
  }

  buildForms() {
    this.productForm = this.fb.group({
      image: [[]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      additionalDescription: ['', [Validators.required]],
      purchase_account_name: ['', [Validators.required]],
      actual_available_stock: [0, [Validators.required]],
      available_stock: [0, [Validators.required]],
      category: ['', [Validators.required]],
      pending: [true], // Default to hidden
      created_time: [null],
      productCount: ['', [Validators.required]],
      paymentMethods: [[], [Validators.required]],
      maxDiscount: ['', [Validators.required]],
    });
  }

  getData(_id: string) {
    this.subscriptions.add(
      this.service.getDetails(_id).subscribe(({ data }) => {
        this.product = data;
      })
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
