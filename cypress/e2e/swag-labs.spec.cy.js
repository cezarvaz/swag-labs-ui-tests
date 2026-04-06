import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';

const successfulUsers = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

describe('Swag Labs website', () => {
  describe('Login', () => {
    beforeEach(() => {
      cy.stubThirdPartyRequests();
      LoginPage.visit();
    });

    successfulUsers.forEach((username) => {
      it(`login with ${username} successfully`, () => {
        LoginPage.login(username, 'secret_sauce');

        InventoryPage.validatePageIsVisible();
      });
    });

    it('login with locked_out_user unsuccessfully', () => {
      LoginPage.login('locked_out_user', 'secret_sauce');

      LoginPage.validateErrorMessage(
        'Epic sadface: Sorry, this user has been locked out.',
      );
    });

    it('username field not filled', () => {
      LoginPage.fillPassword('secret_sauce');
      LoginPage.submit();

      LoginPage.validateErrorMessage('Epic sadface: Username is required');
    });

    it('password field not filled', () => {
      LoginPage.fillUsername('standard_user');
      LoginPage.submit();

      LoginPage.validateErrorMessage('Epic sadface: Password is required');
    });

    it('username and password fields not filled', () => {
      LoginPage.submit();

      LoginPage.validateErrorMessage('Epic sadface: Username is required');
    });
  });

  describe('Authenticated user flows', () => {
    beforeEach(() => {
      cy.stubThirdPartyRequests();
      LoginPage.visit();
      cy.loginAs();
      InventoryPage.validatePageIsVisible();
    });

    it('sorts products by price from low to high', () => {
      InventoryPage.sortProductsBy('lohi');

      InventoryPage.validateProductsSortedByPriceAsc();
    });

    it('sorts products by name from z to a', () => {
      InventoryPage.sortProductsBy('za');

      InventoryPage.validateProductsSortedByNameDesc();
    });

    it('adds and removes a product from the cart on the inventory page', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.validateCartBadgeCount(1);

      InventoryPage.removeBackpackFromCart();
      InventoryPage.validateCartBadgeIsNotVisible();
    });

    it('adds a product to the cart and shows it in the cart page', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.openCart();

      CartPage.validateItemIsInCart('Sauce Labs Backpack');
    });

    it('keeps cart state after page reload', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.validateCartBadgeCount(1);

      InventoryPage.reloadPage();

      InventoryPage.validateCartBadgeCount(1);
    });

    it('opens the product details page and navigates back to inventory', () => {
      InventoryPage.openBackpackDetails();
      InventoryPage.validateBackpackDetails();

      InventoryPage.goBackToProducts();
      InventoryPage.validatePageIsVisible();
    });

    it('shows an error when first name is missing during checkout', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.openCart();
      CartPage.proceedToCheckout();
      CheckoutPage.fillInformation({
        lastName: 'Vaz',
        postalCode: '01001-000',
      });
      CheckoutPage.continue();

      CheckoutPage.validateInformationError('Error: First Name is required');
    });

    it('shows an error when last name is missing during checkout', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.openCart();
      CartPage.proceedToCheckout();
      CheckoutPage.fillInformation({
        firstName: 'Cezar',
        postalCode: '01001-000',
      });
      CheckoutPage.continue();

      CheckoutPage.validateInformationError('Error: Last Name is required');
    });

    it('shows an error when checkout information is incomplete', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.openCart();
      CartPage.proceedToCheckout();
      CheckoutPage.fillInformation({
        firstName: 'Cezar',
        lastName: 'Vaz',
      });
      CheckoutPage.continue();

      CheckoutPage.validateInformationError('Error: Postal Code is required');
    });

    it('completes checkout successfully', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.openCart();
      CartPage.proceedToCheckout();
      CheckoutPage.fillInformation({
        firstName: 'Cezar',
        lastName: 'Vaz',
        postalCode: '01001-000',
      });
      CheckoutPage.continue();
      CheckoutPage.validateOverviewPage();
      CheckoutPage.validateOverviewForBackpack();
      CheckoutPage.finish();

      CheckoutPage.validateCheckoutComplete();
    });

    it('returns to the cart when checkout is cancelled', () => {
      InventoryPage.addBackpackToCart();
      InventoryPage.openCart();
      CartPage.proceedToCheckout();

      CheckoutPage.cancel();
      CartPage.validateItemIsInCart('Sauce Labs Backpack');
    });

    it('logs out successfully from the inventory page', () => {
      InventoryPage.logout();
    });
  });
});
