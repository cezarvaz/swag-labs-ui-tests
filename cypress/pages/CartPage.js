class CartPage {
  SELECTORS = {
    inventoryItemNames: '[data-test="inventory-item-name"]',
    checkoutButton: '[data-test="checkout"]',
  };

  validateItemIsInCart(itemName) {
    cy.get(this.SELECTORS.inventoryItemNames).should('contain.text', itemName);
  }

  proceedToCheckout() {
    cy.get(this.SELECTORS.checkoutButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    cy.location('pathname').should('eq', '/checkout-step-one.html');
  }
}

export default new CartPage();
