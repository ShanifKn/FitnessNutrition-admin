import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TreeNodeComponent } from '../../../../shared/components/tree-node/tree-node.component';
import { CommonModule } from '@angular/common';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TabViewModule, TreeNodeComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {

  
  tree: TreeNode[] = [];

  // Add a new root node (parent)
  addRootNode() {
    const newNode: TreeNode = {
      name: 'New Parent',
      children: [],
    };
    this.tree.push(newNode);
  }

  // Add a child node to a specific parent
  addChildToNode(event: { parentNode: TreeNode; childName: string }) {
    const newChild: TreeNode = {
      name: event.childName,
      children: [],
    };
    event.parentNode.children.push(newChild);
  }
}
