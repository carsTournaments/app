/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    setStorage(name: string, value: any): Chainable<null>;
    getStorage(name: string): Chainable<null>;
    openPage(name: string): Chainable<null>;
    loginEmail(openPage: boolean): Chainable<null>;
    getPhoto(): Chainable<null>;
  }
}
