import { CommonModule } from '@angular/common';
import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploaderComponent {
  mainImage: string | null = null; // Main image URL
  additionalImages: (string | null)[] = [null, null, null]; // Additional images URLs

  @ViewChildren('imageInput') imageInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  // Trigger the hidden input for the main image
  triggerFileInput(input: HTMLInputElement): void {
    input.click();
  }

  // Upload main image
  uploadMainImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.mainImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Trigger file input
  triggerUpload(index: number): void {
    const input = this.imageInputs.toArray()[index];
    if (input) {
      input.nativeElement.click();
    }
  }
  // Upload additional images

  // Upload image and set it in the corresponding slot
  uploadAdditionalImage(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.additionalImages[index] = reader.result as string; // Update the corresponding image
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove image
  removeImage(index: number): void {
    this.additionalImages[index] = null; // Reset the corresponding image slot
  }
}
