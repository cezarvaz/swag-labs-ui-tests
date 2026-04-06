class CartPage {
  SELECTORS = {
    inventoryItemNames: '[data-test="inventory-item-name"]',
    checkoutButton: '[data-test="checkout"]',
  };

  URLS = {
    checkoutStepOne: 'https://www.saucedemo.com/checkout-step-one.html',
  };

  validateItemIsInCart(itemName) {
    cy.get(this.SELECTORS.inventoryItemNames).should('contain.text', itemName);
  }

  proceedToCheckout() {
    cy.get(this.SELECTORS.checkoutButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    cy.url().should('eq', this.URLS.checkoutStepOne);
  }
}

export default new CartPage();
