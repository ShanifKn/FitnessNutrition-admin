import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
})
export class TreeNodeComponent {
  @Input() node!: TreeNode; // The current node being rendered
  @Output() addChild = new EventEmitter<TreeNode>(); // Emit event to add a child
  @Output() removeNode = new EventEmitter<void>(); // Emit event to remove the node

  // Remove a specific child from the current node
  removeChild(index: number) {
    this.node.children.splice(index, 1);
  }
}
