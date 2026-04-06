class InventoryPage {
  SELECTORS = {
    pageTitle: '[data-test="title"]',
    inventoryContainer: '[data-test="inventory-container"]',
    inventoryItems: '[data-test="inventory-item"]',
    inventoryItemNames: '[data-test="inventory-item-name"]',
    inventoryItemPrices: '[data-test="inventory-item-price"]',
    backpackItemName: '[data-test="item-4-title-link"]',
    backpackAddButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
    backpackRemoveButton: '[data-test="remove-sauce-labs-backpack"]',
    cartLink: '.shopping_cart_link',
    cartBadge: '[data-test="shopping-cart-badge"]',
    sortDropdown: '[data-test="product-sort-container"]',
    menuButton: '#react-burger-menu-btn',
    logoutLink: '[data-test="logout-sidebar-link"]',
    itemDetailName: '[data-test="inventory-item-name"]',
    itemDetailDescription: '[data-test="inventory-item-desc"]',
    backToProductsButton: '[data-test="back-to-products"]',
  };

  validatePageIsVisible() {
    cy.location('pathname').should('eq', '/inventory.html');
    cy.get(this.SELECTORS.pageTitle)
      .should('be.visible')
      .and('have.text', 'Products');
    cy.get(this.SELECTORS.inventoryContainer).should('be.visible');
    cy.get(this.SELECTORS.cartLink).should('be.visible');
    cy.get(this.SELECTORS.inventoryItems).should('have.length.greaterThan', 0);
  }

  addBackpackToCart() {
    cy.get(this.SELECTORS.backpackAddButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  removeBackpackFromCart() {
    cy.get(this.SELECTORS.backpackRemoveButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  validateCartBadgeCount(count) {
    cy.get(this.SELECTORS.cartBadge)
      .should('be.visible')
      .and('have.text', `${count}`);
  }

  validateCartBadgeIsNotVisible() {
    cy.get(this.SELECTORS.cartBadge).should('not.exist');
  }

  reloadPage() {
    cy.reload();
    this.validatePageIsVisible();
  }

  openCart() {
    cy.get(this.SELECTORS.cartLink).should('be.visible').click();
    cy.location('pathname').should('eq', '/cart.html');
  }

  openBackpackDetails() {
    cy.get(this.SELECTORS.backpackItemName).should('be.visible').click();
    cy.location('pathname').should('eq', '/inventory-item.html');
    cy.location('search').should('eq', '?id=4');
  }

  validateBackpackDetails() {
    cy.get(this.SELECTORS.itemDetailName)
      .should('be.visible')
      .and('have.text', 'Sauce Labs Backpack');
    cy.get(this.SELECTORS.itemDetailDescription)
      .should('be.visible')
      .and('contain.text', 'carry.allTheThings()');
  }

  goBackToProducts() {
    cy.get(this.SELECTORS.backToProductsButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    cy.location('pathname').should('eq', '/inventory.html');
  }

  sortProductsBy(option) {
    cy.get(this.SELECTORS.sortDropdown).should('be.visible').select(option);
  }

  validateProductsSortedByPriceAsc() {
    cy.get(this.SELECTORS.inventoryItemPrices).should(($prices) => {
      const prices = [...$prices].map((price) =>
        Number.parseFloat(price.innerText.replace('$', '')),
      );
      const sortedPrices = [...prices].sort((first, second) => first - second);

      expect(prices).to.deep.equal(sortedPrices);
    });
  }

  validateProductsSortedByNameDesc() {
    cy.get(this.SELECTORS.inventoryItemNames).should(($names) => {
      const names = [...$names].map((name) => name.innerText.trim());
      const sortedNames = [...names].sort((first, second) =>
        second.localeCompare(first),
      );

      expect(names).to.deep.equal(sortedNames);
    });
  }

  openMenu() {
    cy.get(this.SELECTORS.menuButton).should('be.visible').click();
  }

  logout() {
    this.openMenu();
    cy.get(this.SELECTORS.logoutLink).should('be.visible').click();
    cy.location('pathname').should('eq', '/');
  }
}

export default new InventoryPage();
