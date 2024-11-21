import { Component } from '@angular/core';
import { ImageUploaderComponent } from '../../../../../shared/components/image-uploader/image-uploader.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';

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
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  cities!: City[];
  payment!: City[];
  branchList!: any[];
  analytics!: any[];
  categories!: any[];
  variants!: any[];
  text: string | undefined;

  constructor() {
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
}
