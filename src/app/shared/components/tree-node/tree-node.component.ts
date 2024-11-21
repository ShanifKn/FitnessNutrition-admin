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
  @Output() addChild = new EventEmitter<{
    parentNode: TreeNode;
    childName: string;
  }>();

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

  allData: any[] = [];

}
