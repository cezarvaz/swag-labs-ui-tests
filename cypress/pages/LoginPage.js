class LoginPage {
  SELECTORS = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
  };

  URLS = {
    login: 'https://www.saucedemo.com/',
  };

  visit() {
    cy.visit('/');
    cy.url().should('eq', this.URLS.login);
  }

  fillUsername(username) {
    cy.get(this.SELECTORS.usernameInput).should('be.visible').clear();
    cy.get(this.SELECTORS.usernameInput).type(username);
  }

  fillPassword(password) {
    cy.get(this.SELECTORS.passwordInput).should('be.visible').clear();
    cy.get(this.SELECTORS.passwordInput).type(password);
  }

  submit() {
    cy.get(this.SELECTORS.loginButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  validateErrorMessage(errorMessage) {
    cy.get(this.SELECTORS.errorMessage)
      .should('be.visible')
      .and('have.text', errorMessage);
  }
}

export default new LoginPage();
