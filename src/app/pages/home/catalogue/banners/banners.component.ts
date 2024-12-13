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
import { forkJoin, Subscription } from 'rxjs';
import {
  BannerData,
  Banners,
} from '../../../../shared/interfaces/data.interface';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { CategoryService } from '../categories/category.service';
import { FileUploadService } from '../../../../shared/services/file-upload.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    ConfirmPopupModule,
    ConfirmDialogModule,
  ],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss',
  providers: [BannerService, ConfirmationService, ConfirmationService],
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
  productList: any = [];
  sidebarVisible: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;
  date: Date | undefined;
  imageLoaded = false;
  emptyBanner = true;

  onImageLoad() {
    this.imageLoaded = true;
  }

  private subscriptions = new Subscription();

  services = inject(BannerService);
  confirmationService = inject(ConfirmationService);

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private imageService: FileUploadService
  ) {}

  ngOnInit() {
    this.addData();
    this.getBanners();
    this.formBuild();
  }

  formBuild() {
    this.bannerForm = this.fb.group({
      _id: [''],
      title: ['', [Validators.required]],
      expDate: ['', [Validators.required]],
      bannerType: ['', [Validators.required]],
      visibility: [true, [Validators.required]],
      category: [''],
      subCategory: [''],
      product: [''],
      image: [null, [Validators.required]],
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

            // Reset the form
            this.bannerForm.reset();
            this.imagePreview = null;

            // Close the dialog
            this.sidebarVisible = false;
            this.emptyBanner = false;
          })
      );
      // Perform submit logic
    }
  }

  removeBanner(_id: string) {
    this.subscriptions.add(
      this.services.deleteBanner(_id).subscribe(({ message }) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: message,
        });
        this.removeBannerData(_id);
      })
    );
  }

  confirm2(event: Event, _id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this Banner?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.removeBanner(_id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
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
        this.subCategories.push(...selectedCategory.subCategory);
      }
    });
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

      this.bannerForm.patchValue({
        image: url,
      });
    });

    this.subscriptions.add(sub);
  }

  getBanners() {
    this.subscriptions.add(
      forkJoin({
        banner: this.services.getBanners(),
        categories: this.categoryService.getData(),
      }).subscribe({
        next: ({ banner, categories }) => {
          // Assign the results to respective variables
          this.banners = banner.data;

          if (
            this.banners &&
            this.banners.mainBanners?.length === 0 &&
            this.banners.subBanners?.length === 0 &&
            this.banners.offerBanners?.length === 0 &&
            this.banners.bottomBanners?.length === 0
          ) {
            this.emptyBanner = true;
          } else {
            this.emptyBanner = false;
          }

          this.categories = categories.data;
        },
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
    for (const bannerType of [
      'mainBanners',
      'subBanners',
      'offerBanners',
      'bottomBanners',
    ] as const) {
      // Get the corresponding banners array
      const bannersArray = this.banners[bannerType];

      // Check if the bannersArray exists
      if (bannersArray) {
        // Filter out the banner with the matching _id
        this.banners[bannerType] = bannersArray.filter(
          (banner) => banner._id !== bannerId
        );
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showDialog() {
    this.visible = !this.visible;
  }

  closeDialog() {
    this.visible = false;
  }

  addData() {
    this.type = [
      { name: 'Main Banner', code: 'NY' },
      { name: 'Sub Banner', code: 'RM' },
      { name: 'Offer Banner', code: 'LDN' },
      { name: 'Bottom Banner', code: 'LDN' },
    ];
  }
}
