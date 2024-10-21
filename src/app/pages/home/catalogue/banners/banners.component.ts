import {
  afterNextRender,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BannerService } from './banner.service';
import { Subscription } from 'rxjs';
import {
  BannerData,
  Banners,
} from '../../../../shared/interfaces/data.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
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
    ToastModule,
    CalendarModule,
    MultiSelectModule,
    DatePipe,
    SkeletonModule,
  ],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss',
  providers: [BannerService],
})
export class BannersComponent implements OnInit, OnDestroy {
  banners!: Banners;

  visible: boolean = false;
  selectedVisibility: string = 'hidden';
  type!: any[];
  categories!: any[];
  bannerForm!: FormGroup; // Create a FormGroup instance
  selectedCategory: any; // Track selected category
  selectedSubCategory: any; // Track selected sub-category
  subCategories: any = [];
  sidebarVisible: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;
  date: Date | undefined;
  imageLoaded = false;

  onImageLoad() {
    this.imageLoaded = true;
  }

  private subscriptions = new Subscription();

  services = inject(BannerService);

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.addData();
    this.getBanners();
    this.formBuild();
  }

  formBuild() {
    this.bannerForm = this.fb.group({
      title: ['', [Validators.required]],
      expDate: ['', [Validators.required]],
      bannerType: ['', [Validators.required]],
      visibility: [true, [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: [],
      product: [''],
      image: [null],
    });
  }

  onSubmit() {
    if (this.bannerForm.valid) {

      this.subscriptions.add(
        this.services
          .createBanners(this.bannerForm.value)
          .subscribe(({ message }) => {
            this.messageService.add({ severity: 'success', summary: message });

            this.addBannerData(this.bannerForm.value);
          })
      );
      // Perform submit logic
    }
  }

  removeBanner(_id: string) {
    this.subscriptions.add(
      this.services.deleteBanner(_id).subscribe(({ message }) => {
        this.messageService.add({ severity: 'success', summary: message });
        this.removeBannerData(_id)
      })
    );
  }

  // Handle category change
  onCategoryChange(event: any) {
    // Get the selected categories from the event
    const selectedCategories = event.value;

    // Clear subCategories before adding new ones
    this.subCategories = [];

    // Iterate over selected categories to aggregate subcategories
    selectedCategories.forEach((selectedCategoryId: string) => {
      const selectedCategory = this.categories.find(
        (cat) => cat._id === selectedCategoryId
      );
      if (selectedCategory) {
        // Add subcategories to the subCategories array
        this.subCategories.push(...selectedCategory.subCategories);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
      this.bannerForm.patchValue({
        image: 'https://via.placeholder.com/550x240',
      });
    }
  }

  getBanners() {
    this.subscriptions.add(
      this.services.getBanners().subscribe(({ data }) => {
        this.banners = data;

        console.log(this.banners);
      })
    );
  }

  addBannerData(banner: BannerData) {
    switch (banner.bannerType) {
      case 'Main Banner':
        this.banners.mainBanners = this.banners.mainBanners || [];

        this.banners.mainBanners.push(banner); // Add the new banner
        break;
      case 'Sub Banner':
        this.banners.subBanners = this.banners.subBanners || [];
        this.banners.subBanners.push(banner);
        break;
      case 'Offer Banner':
        this.banners.offerBanners = this.banners.offerBanners || [];
        this.banners.offerBanners.push(banner);
        break;
      case 'Bottom Banner':
        this.banners.bottomBanners = this.banners.bottomBanners || [];
        this.banners.bottomBanners.push(banner);
        break;
      default:
        console.error('Unknown banner type:', banner.bannerType);
        break;
    }
  }

  removeBannerData(bannerId: string) {
    // Loop through each banner type in the banners object
    for (const bannerType of ["mainBanners", "subBanners", "offerBanners", "bottomBanners"] as const) {
      // Get the corresponding banners array
      const bannersArray = this.banners[bannerType];
  
      // Check if the bannersArray exists
      if (bannersArray) {
        // Filter out the banner with the matching _id
        this.banners[bannerType] = bannersArray.filter(banner => banner._id !== bannerId);
      }
    }
  }
  
  

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showDialog() {
    this.visible = true;
  }

  addData() {
    this.categories = [
      {
        _id: '605c72e2d2b3b134a840c6e4',
        name: 'Strength Training',
        code: 'ST',
        subCategories: [
          { name: 'Dumbbells', code: 'DB', _id: '605c72e2d2b3b134a840c6e5' },
          { name: 'Barbells', code: 'BB', _id: '605c72e2d2b3b134a840c6e6' },
          { name: 'Kettlebells', code: 'KB', _id: '605c72e2d2b3b134a840c6e7' },
        ],
      },
      {
        _id: '605c72e2d2b3b134a840c6e8',
        name: 'Cardio Equipment',
        code: 'CE',
        subCategories: [
          { name: 'Treadmills', code: 'TM', _id: '605c72e2d2b3b134a840c6e9' },
          {
            name: 'Elliptical Machines',
            code: 'EM',
            _id: '605c72e2d2b3b134a840c6ea',
          },
          {
            name: 'Exercise Bikes',
            code: 'EB',
            _id: '605c72e2d2b3b134a840c6eb',
          },
        ],
      },
    ];

    this.type = [
      { name: 'Main Banner', code: 'NY' },
      { name: 'Sub Banner', code: 'RM' },
      { name: 'Offer Banner', code: 'LDN' },
      { name: 'Bottom Banner', code: 'LDN' },
    ];
  }
}
