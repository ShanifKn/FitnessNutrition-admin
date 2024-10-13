import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddModalComponent } from './modals/add-modal/add-modal.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule, DynamicDialogModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  providers: [DialogService]
})
export class FaqComponent {

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  onAdd() {
    this.ref = this.dialogService.open(AddModalComponent, {
      header: 'Add Question',
      width: '50%',
      dismissableMask: true,
    })
  }

}
