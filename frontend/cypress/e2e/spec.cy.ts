// cypress/integration/crud.spec.js

describe('CRUD Operations', () => {
  const itemName = 'Test Item';
  const updatedItemName = 'Updated Item';
  const itemDes = 'Test Description';
  const updatedItemDes = 'Updated Description';
  const itemNameToDelete = 'Updated Description';

  beforeEach(() => {
    cy.visit('/');
  });

  it('should create a new item', () => {
    // Click the button to add a new item
    cy.get('[data-cy=add-item]').click();

    // Fill out the form and submit
    cy.get('[data-cy=item-name]').type(itemName);
    cy.get('[data-cy=item-des]').type(itemDes);
    cy.get('[data-cy=save-button]').click();

    // Verify that the new item is displayed
    cy.contains(itemName).should('exist');
  });

  it('should update an existing item', () => {
  
    // Find the item and click the edit button
    cy.contains(itemName)
      .parent()
      .find('[data-cy=edit-button]')
      .click();

    // Update the item name and save changes
    cy.get('[data-cy=item-name]').clear().type(updatedItemName);
    cy.get('[data-cy=item-des]').clear().type(updatedItemDes);
    cy.get('[data-cy=save-button]').click();

    // Verify that the item has been updated
    cy.contains(updatedItemName).should('exist');
  });

  it('should delete an item', () => {
    // Intercept the confirmation dialog
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Are you sure you want to delete this item?'); // Confirm the expected message
      return true; // Click the "OK" button (returning true confirms the action)
    });

    // Find the item and click the delete button
    cy.contains(itemNameToDelete)
      .parent()
      .find('[data-cy=delete-button]')
      .click();

    // Verify that the item has been deleted
    cy.contains(itemNameToDelete).should('not.exist');
  });

  // Add more tests as needed for your specific CRUD features
});
