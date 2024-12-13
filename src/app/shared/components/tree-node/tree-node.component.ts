import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TreeNode {
  title: string;
  subCategory: TreeNode[];
  level: number;
  selected?: boolean;
}

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;
  @Output() saveNode = new EventEmitter<any>();
  @Output() addChild = new EventEmitter<{
    parentNode: TreeNode;
    childName: string;
  }>();
  @Output() deleteParent = new EventEmitter<any>();

  isExpanded = false;
  isEditing = false;
  showAddChildInput = false;
  newChildName = '';

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

  deleteNode() {
    this.deleteParent.emit(this.node); // Emit the current node to the parent for deletion
  }

  deleteChildNode(childNode: any) {
    const index = this.node.subCategory.indexOf(childNode);
    if (index !== -1) {
      this.node.subCategory.splice(index, 1); // Remove the child node from the subCategory array
    }
  }

  saveParentNode() {
    this.saveNode.emit(this.node); // Emit updated node to the parent

    this.isEditing = false; // Exit edit mode
  }

  allData: any[] = [];
}
