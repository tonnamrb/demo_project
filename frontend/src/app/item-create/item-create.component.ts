// item-create.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
})
export class ItemCreateComponent {
  itemName: string = '';
  itemDescription: string = '';

  constructor(private itemService: ItemService, private router: Router) {}

  saveItem(): void {
    
    console.log('Saving new item:', this.itemName, this.itemDescription);

    
    this.itemService.createItem({
      name: this.itemName,
      description: this.itemDescription,
    }).subscribe(
      (response) => {
        console.log('Item saved successfully:', response);
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Error saving item:', error);
        
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }
}
