import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

interface TreeNode {
  title: string;
  subCategory: TreeNode[];
  level: number;
  selected?: boolean;
  visible?: boolean;
}

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDialogModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
  providers: [ConfirmationService],
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;
  @Output() saveNode = new EventEmitter<any>();
  @Output() addChild = new EventEmitter<{
    parentNode: TreeNode;
    childName: string;
  }>();
  @Output() deleteParent = new EventEmitter<TreeNode>(); // Updated to emit the current node

  isExpanded = false;
  isEditing = false;
  showAddChildInput = false;
  newChildName = '';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // Expand or collapse subCategory
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  // Enable in-place editing
  editNode() {
    this.isEditing = true;
  }

  // Add a child node
  addChilds() {
    if (this.newChildName.trim()) {
      this.addChild.emit({
        parentNode: this.node,
        childName: this.newChildName.trim(),
      });
      this.newChildName = '';
      this.showAddChildInput = false;
    }
  }

  editParent() {
    this.isEditing = false;
  }

  // Emit delete event to parent
  removeNode(data: any) {
    this.deleteParent.emit(this.node); // Emit event so the parent can handle deletion
  }

  confirm12(event: Event, childNode: TreeNode) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this Category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        childNode.visible = false;

        if (childNode.subCategory && Array.isArray(childNode.subCategory)) {
          childNode.subCategory = childNode.subCategory.map((sub) => ({
            ...sub,
            visible: false,
          }));
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  hideChildNode(childNode: TreeNode) {}

  saveParentNode() {
    this.saveNode.emit(this.node);
    this.isEditing = false;
  }

  allData: any[] = [];
}
