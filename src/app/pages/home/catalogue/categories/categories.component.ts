import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TreeNodeComponent } from '../../../../shared/components/tree-node/tree-node.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FeaturedCategoriesComponent } from '../../../../shared/components/featured-categories/featured-categories.component';
import { DialogModule } from 'primeng/dialog';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    TabViewModule,
    TreeNodeComponent,
    CommonModule,
    ButtonModule,
    FeaturedCategoriesComponent,
    DialogModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  mainImage: string | null = null; // Main image URL
  cancelDialog: boolean = false;
  tree: TreeNode[] = [
    {
      name: 'Parent 1',
      children: [],
    },
    {
      name: 'Parent 2',
      children: [],
    },
    {
      name: 'Parent 3',
      children: [],
    },
  ];

  // Add a new root node (parent)
  addRootNode() {
    const newNode: TreeNode = {
      name: `New Parent`,
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
