import SwagLabsActions from '../actions/SwagLabsActions';

describe('Swag Labs website', () => {
  beforeEach(() => {
    SwagLabsActions.swagLabsPage();
  });

  it('login with standard_user successfully', () => {
    SwagLabsActions.login('standard_user', 'secret_sauce');

    SwagLabsActions.validateShopCartIsVisible();
  });

  it('login with problem_user successfully', () => {
    SwagLabsActions.login('problem_user', 'secret_sauce');

    SwagLabsActions.validateShopCartIsVisible();
  });

  it('login with performance_glitch_user successfully', () => {
    SwagLabsActions.login('performance_glitch_user', 'secret_sauce');

    SwagLabsActions.validateShopCartIsVisible();
  });

  it('login with error_user successfully', () => {
    SwagLabsActions.login('error_user', 'secret_sauce');

    SwagLabsActions.validateShopCartIsVisible();
  });

  it('login with visual_user successfully', () => {
    SwagLabsActions.login('visual_user', 'secret_sauce');

    SwagLabsActions.validateShopCartIsVisible();
  });

  it('login with locked_out_user unsuccessfully', () => {
    SwagLabsActions.login('locked_out_user', 'secret_sauce');

    SwagLabsActions.validateErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });

  it('username field not filled', () => {
    SwagLabsActions.passwordField('secret_sauce');
    SwagLabsActions.loginButton();

    SwagLabsActions.validateErrorMessage('Epic sadface: Username is required');
  });

  it('password field not filled', () => {
    SwagLabsActions.usernameField('standard_user');
    SwagLabsActions.loginButton();

    SwagLabsActions.validateErrorMessage('Epic sadface: Password is required');
  });

  it('username and password fields not filled', () => {
    SwagLabsActions.loginButton();

    SwagLabsActions.validateErrorMessage('Epic sadface: Username is required');
  });
});
