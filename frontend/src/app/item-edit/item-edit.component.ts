// item-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit {
  editedItemName: string = '';
  editedItemDescription: string = '';
  itemId: number = 0;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the item ID from the route parameters
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.fetchItemDetails();
    });
  }

  fetchItemDetails(): void {
    
    this.itemService.getItemById(this.itemId).subscribe(
      (item) => {
        this.editedItemName = item.name;
        this.editedItemDescription = item.description;
      },
      (error) => {
        console.error('Error fetching item details:', error);
       
      }
    );
  }

  updateItem(): void {
   
    this.itemService.updateItem(this.itemId, {
      name: this.editedItemName,
      description: this.editedItemDescription,
    }).subscribe(
      (response) => {
        console.log('Item updated successfully:', response);
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Error updating item:', error);
        
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']); // Adjust the route based on your configuration
  }
}
