it('has valid env values', () => {
  expect(Cypress.env())
    .to.be.an('object')
    .and.to.include.keys('url')
  // cy.wrap(Cypress.env('person'))
  //   .should('have.keys', 'url')
  cy.log('**url:** ' + Cypress.env().url)
  cy.screenshot('env', { capture: 'runner' })
})

describe('HomePage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
  })

  it('Check page', () => {
    cy.openPage('home');
    cy.contains('Torneos de coches ficticios');
    cy.contains('Entrar');
  })
})

describe('TournamentsPage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.openPage('tournaments');
  })

  it('Check page', () => {
    cy.contains('Torneos');
    cy.contains('Ranking');
  })

  it('Click tournament', () => {
    cy.get('tournament-item').eq(1).click();
  })

  it('Click ranking', () => {
    cy.get('.option-item').click();
  })
})


describe('TournamentPage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.openPage('tournaments');
  })

  // it('Check page', () => {
  // })

})

describe('AccountPage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.openPage('account');
  })

  it('Login', () => {
    cy.loginEmail(false);
    cy.get('#title-sub').contains('Tu cuenta')
  })

})
