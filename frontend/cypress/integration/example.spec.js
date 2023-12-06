// cypress/integration/crud.spec.js
describe('CRUD Operations', () => {
    const itemName = 'Test Item';
    const updatedItemName = 'Updated Item';
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should create a new item', () => {
      // Click the button to add a new item
      cy.get('[data-cy=add-item]').click();
  
      // Fill out the form and submit
      cy.get('[data-cy=item-name]').type(itemName);
      cy.get('[data-cy=save-button]').click();
  
      // Verify that the new item is displayed
      cy.contains(itemName).should('exist');
    });
  
    it('should update an existing item', () => {
      // Create a new item first
      cy.get('[data-cy=add-item]').click();
      cy.get('[data-cy=item-name]').type(itemName);
      cy.get('[data-cy=save-button]').click();
  
      // Find the item and click the edit button
      cy.contains(itemName)
        .parent()
        .find('[data-cy=edit-button]')
        .click();
  
      // Update the item name and save changes
      cy.get('[data-cy=item-name]').clear().type(updatedItemName);
      cy.get('[data-cy=save-button]').click();
  
      // Verify that the item has been updated
      cy.contains(updatedItemName).should('exist');
    });
  
    it('should delete an existing item', () => {
      // Create a new item first
      cy.get('[data-cy=add-item]').click();
      cy.get('[data-cy=item-name]').type(itemName);
      cy.get('[data-cy=save-button]').click();
  
      // Find the item and click the delete button
      cy.contains(itemName)
        .parent()
        .find('[data-cy=delete-button]')
        .click();
  
      // Verify that the item has been deleted
      cy.contains(itemName).should('not.exist');
    });
  
    // Add more tests as needed for your specific CRUD features
  });
  