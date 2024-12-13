import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploadComponent {
  @Input() images: (string | null)[] = []; // Receive the images array from parent

  @ViewChildren('imageInput') imageInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  // Trigger the hidden input for the main image
  triggerFileInput(input: HTMLInputElement): void {
    input.click();
  }

  // Upload the main image (image[0])
  uploadMainImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images[0] = reader.result as string; // Update main image in the array
      };
      reader.readAsDataURL(file);
    }
  }

  // Trigger file input for additional images
  triggerUpload(input: HTMLInputElement): void {
    input.click();
  }
  // Upload additional images (images[1] to images[n])
  uploadAdditionalImage(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images[index] = reader.result as string; // Update the image in the corresponding slot
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove image
  removeImage(index: number): void {
    this.images[index] = null; // Clear the image slot in the array
  }
}
