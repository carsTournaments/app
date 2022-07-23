/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { Storage } from '@ionic/storage';
import { routes } from './../../src/app/core/config/routes.config';

const storage = new Storage;
const url = Cypress.env().url;

Cypress.Commands.add('setStorage', (name: string, value: any) => {
  storage.set(name, value)
})
Cypress.Commands.add('getStorage', (name: string) => {
  storage.get(name)
})

Cypress.Commands.add('openPage', (name: string) => {
  cy.visit(`${url}/${routes[name]}`)
});

Cypress.Commands.add('loginEmail', (openPage = true) => {
  if (openPage) {
    cy.openPage('account');
  }
  cy.get('#loginEmail').click();
  cy.get('#email')
    .should('be.visible')
    .type('xskunk@gmail.com')
  cy.get('#password')
    .should('be.visible')
    .type('975865')
  cy.get('#buttonLogin').click()
})

Cypress.Commands.add('createCar', () => {
  cy.loginEmail(true);
  cy.get('#option_myGarage').click();
  cy.contains('Garaje');
  cy.get('#garageAdd').click();
  cy.contains('Garaje');

  cy.get('#selectBrand').click();
  cy.get('#alert-input-1-3').click();
  cy.get('.alert-button').eq(1).click();

  cy.get('#inputModel').type('FAKE');

  cy.get('#selectTraction').click();
  cy.get('#alert-input-2-1').click();
  cy.get('.alert-button').eq(1).click();

  cy.get('#selectFuel').click();
  cy.get('#alert-input-3-1').click();
  cy.get('.alert-button.ion-focusable.ion-activatable.sc-ion-alert-ios')
    .eq(1).click();

  cy.get('#selectStock').click();
  cy.get('#alert-input-4-1').click();
  cy.get('.alert-button.ion-focusable.ion-activatable.sc-ion-alert-ios').eq(1).click();

  cy.get('#inputYear').type('2020');
  cy.get('#inputCC').type('2000');
  cy.get('#inputCV').type('150');
  cy.get('#inputInfo').type('Prueba de añadir un coche');

  cy.get('#buttonAdd').click();
  cy.get('.alert-button-role-cancel').click();
})
