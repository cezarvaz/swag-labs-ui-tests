class CheckoutPage {
  SELECTORS = {
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    finishButton: '[data-test="finish"]',
    cancelButton: '[data-test="cancel"]',
    errorMessage: '[data-test="error"]',
    summaryContainer: '[data-test="checkout-summary-container"]',
    completeContainer: '[data-test="checkout-complete-container"]',
    completeHeader: '[data-test="complete-header"]',
    cartItemLabel: '[data-test="inventory-item-name"]',
    summarySubtotalLabel: '[data-test="subtotal-label"]',
    summaryTaxLabel: '[data-test="tax-label"]',
    summaryTotalLabel: '[data-test="total-label"]',
  };

  fillInformation({ firstName, lastName, postalCode }) {
    if (firstName) {
      cy.get(this.SELECTORS.firstNameInput).should('be.visible').clear();
      cy.get(this.SELECTORS.firstNameInput).type(firstName);
    }

    if (lastName) {
      cy.get(this.SELECTORS.lastNameInput).should('be.visible').clear();
      cy.get(this.SELECTORS.lastNameInput).type(lastName);
    }

    if (postalCode) {
      cy.get(this.SELECTORS.postalCodeInput).should('be.visible').clear();
      cy.get(this.SELECTORS.postalCodeInput).type(postalCode);
    }
  }

  continue() {
    cy.get(this.SELECTORS.continueButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  validateInformationError(errorMessage) {
    cy.get(this.SELECTORS.errorMessage)
      .should('be.visible')
      .and('have.text', errorMessage);
  }

  validateOverviewPage() {
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    cy.get(this.SELECTORS.summaryContainer).should('be.visible');
  }

  validateOverviewForBackpack() {
    cy.get(this.SELECTORS.cartItemLabel)
      .should('be.visible')
      .and('contain.text', 'Sauce Labs Backpack');
    cy.get(this.SELECTORS.summarySubtotalLabel)
      .should('be.visible')
      .and('contain.text', '$29.99');
    cy.get(this.SELECTORS.summaryTaxLabel).should('be.visible');
    cy.get(this.SELECTORS.summaryTotalLabel).should('be.visible');
  }

  finish() {
    cy.get(this.SELECTORS.finishButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  cancel() {
    cy.get(this.SELECTORS.cancelButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    cy.location('pathname').should('eq', '/cart.html');
  }

  validateCheckoutComplete() {
    cy.location('pathname').should('eq', '/checkout-complete.html');
    cy.get(this.SELECTORS.completeContainer).should('be.visible');
    cy.get(this.SELECTORS.completeHeader)
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  }
}

export default new CheckoutPage();
