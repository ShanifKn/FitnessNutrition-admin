import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TreeNodeComponent } from "../../../../shared/components/tree-node/tree-node.component";
import { CommonModule } from '@angular/common';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TabViewModule, TreeNodeComponent,CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  // Array of top-level parent nodes
  tree: TreeNode[] = [];

  // Add a new top-level parent node
  addParent() {
    this.tree.push({ name: 'New Parent', children: [] });
  }

  // Add a child to the specified node
  addChild(node: TreeNode) {
    node.children.push({ name: 'New Child', children: [] });
  }

  // Remove a parent node by index
  removeNode(index: number) {
    this.tree.splice(index, 1);
  }
}
