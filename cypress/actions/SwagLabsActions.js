class swagLabsActions {
  swagLabsPage() {
    cy.visit('/');
    cy.url().should('eq', 'https://www.saucedemo.com/');
  }

  usernameField(username) {
    cy.get('[data-test="username"]').type(username);
  }

  passwordField(password) {
    cy.get('[data-test="password"]').type(password);
  }

  loginButton() {
    cy.get('[data-test="login-button"]').click();
  }

  validateShopCartIsVisible() {
    cy.get('.shopping_cart_link').should('be.visible');
  }

  validateErrorMessage(error) {
    cy.get('[data-test="error"]').should('be.visible').and('have.text', error);
  }

  login(username, password) {
    this.usernameField(username);
    this.passwordField(password);
    this.loginButton();
  }
}

export default new swagLabsActions();
