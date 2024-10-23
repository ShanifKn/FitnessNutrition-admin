import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-coupon-detail',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    CommonModule,
    TableModule,
    CommonModule,
  ],
  templateUrl: './coupon-detail.component.html',
  styleUrl: './coupon-detail.component.scss',
})
export class CouponDetailComponent {
  value!: string;

  groupedCities!: SelectItemGroup[];

  selectedCities!: City[];

  categoryLevels: any[];

  categoryLevels2: any[];

  product: any[] = [
    {
      no: 1,
      product: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Protein Powder',
      stock: '8 In Stock',
      splPrice: 'AED 150.00',
      ofPrice: 'AED 150.00',
      discount: '10%',
    },
    {
      no: 2,
      product: 'Dymatize Elite 100% Whey Protein',
      category: 'Protein Powder',
      stock: 'Out of stock',
      splPrice: 'AED 140.00',
      ofPrice: 'AED 140.00',
      discount: '15%',
    },
    {
      no: 3,
      product: 'MuscleTech NitroTech Whey Protein',
      category: 'Protein Powder',
      stock: '5 In Stock',
      splPrice: 'AED 160.00',
      ofPrice: 'AED 160.00',
      discount: '20%',
    },
    {
      no: 4,
      product: 'BSN Syntha-6 Protein Powder',
      category: 'Protein Powder',
      stock: 'Out of stock',
      splPrice: 'AED 130.00',
      ofPrice: 'AED 130.00',
      discount: '5%',
    },
    {
      no: 5,
      product: 'MyProtein Impact Whey Protein',
      category: 'Protein Powder',
      stock: '12 In Stock',
      splPrice: 'AED 120.00',
      ofPrice: 'AED 120.00',
      discount: '25%',
    },
  ];

  constructor() {
    this.groupedCities = [
      {
        label: 'Germany',
        value: 'de',
        items: [
          { label: 'Berlin', value: 'Berlin' },
          { label: 'Frankfurt', value: 'Frankfurt' },
          { label: 'Hamburg', value: 'Hamburg' },
          { label: 'Munich', value: 'Munich' },
        ],
      },
      {
        label: 'USA',
        value: 'us',
        items: [
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Los Angeles', value: 'Los Angeles' },
          { label: 'New York', value: 'New York' },
          { label: 'San Francisco', value: 'San Francisco' },
        ],
      },
      {
        label: 'Japan',
        value: 'jp',
        items: [
          { label: 'Kyoto', value: 'Kyoto' },
          { label: 'Osaka', value: 'Osaka' },
          { label: 'Tokyo', value: 'Tokyo' },
          { label: 'Yokohama', value: 'Yokohama' },
        ],
      },
    ];

    this.categoryLevels = [
      {
        items: [
          { label: 'Level 1', value: 'Berlin' },
          { label: 'Level 2', value: 'Frankfurt' },
          { label: 'Level 3', value: 'Hamburg' },
        ],
      },
    ];

    this.categoryLevels2 = [
      {
        items: [
          {
            label: 'Level 1',
            value: 'Berlin',
            image: 'https://picsum.photos/200/300',
          },
          {
            label: 'Level 2',
            value: 'Frankfurt',
            image: 'https://picsum.photos/200/300',
          },
          {
            label: 'Level 3',
            value: 'Hamburg',
            image: 'https://picsum.photos/200/300',
          },
        ],
      },
    ];
  }
}
