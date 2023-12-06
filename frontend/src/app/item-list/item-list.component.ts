// item-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  createItem(): void {
    this.router.navigate(['/create']); 
  }

  editItem(itemId: number): void {
    this.router.navigate(['/edit', itemId]); 
  }



  deleteItem(itemId: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(itemId).subscribe(
        (response) => {
          console.log('Item deleted successfully:', response);
          this.fetchItems(); 
        },
        (error) => {
          console.error('Error deleting item:', error);
          
        }
      );
    }
  }
  
}
