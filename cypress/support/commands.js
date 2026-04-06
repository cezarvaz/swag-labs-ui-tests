import '@testing-library/cypress/add-commands';
import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('stubThirdPartyRequests', () => {
  const blockedHosts = [
    'googletagmanager.com',
    'google-analytics.com',
    'analytics.google.com',
    'doubleclick.net',
    'googlesyndication.com',
    'facebook.net',
    'connect.facebook.net',
    'clarity.ms',
    'segment.com',
    'cdn.segment.com',
    'hotjar.com',
    'script.hotjar.com',
    'fullstory.com',
    'intercom.io',
    'intercomcdn.com',
  ];

  blockedHosts.forEach((host) => {
    const escapedHost = host.replaceAll('.', '\\.');

    cy.intercept(
      {
        url: new RegExp(`^https?://([^/]+\\.)?${escapedHost}(/|$)`),
      },
      {
        statusCode: 204,
        body: '',
      },
    );
  });
});

Cypress.Commands.add(
  'loginAs',
  (username = 'standard_user', password = 'secret_sauce') => {
    LoginPage.login(username, password);
  },
);
