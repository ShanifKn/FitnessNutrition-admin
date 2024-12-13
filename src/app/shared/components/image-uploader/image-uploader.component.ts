import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  Input,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { MessageService } from 'primeng/api';

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

  private subscriptions = new Subscription();
  imageService = inject(FileUploadService);
  messageService = inject(MessageService);

  // Trigger the hidden input for the main image
  triggerFileInput(input: HTMLInputElement): void {
    input.click();
  }

  // Upload the main image (image[0])
  async uploadMainImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const url = await this.uploadOnServer(file);

      this.images[0] = url;

      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.images[0] = reader.result as string; // Update main image in the array
      // };
      // reader.readAsDataURL(file);
    }
  }

  // Trigger file input for additional images
  triggerUpload(input: HTMLInputElement): void {
    input.click();
  }
  // Upload additional images (images[1] to images[n])
  async uploadAdditionalImage(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const url = await this.uploadOnServer(file);

      this.images[index] = url;

      // const reader = new FileReader();
      // reader.onload = () => {};
      // reader.readAsDataURL(file);
    }
  }

  // Remove image
  removeImage(index: number): void {
    this.images[index] = null; // Clear the image slot in the array
  }

  // Method to upload an image file to the server
  async uploadOnServer(file: any): Promise<string> {
    const formData = new FormData();
    formData.append('image', file, file.name); // Append the file to formData with the 'image' field

    try {
      // Call the image upload service and await its response
      const response: any = await this.imageService
        .imageUplaod(formData)
        .toPromise();

      // Display a success message
      this.messageService.add({
        severity: 'success',
        summary: 'Image uploaded successfully',
      });

      console.log('Uploaded URL:', response.url);

      // Return the uploaded URL
      return response.url;
    } catch (error) {
      // Handle any errors that occur during the upload
      console.error('Image upload failed:', error);
      throw error; // Optional: rethrow the error if needed
    }
  }
}
