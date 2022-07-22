import 'cypress-file-upload';


it('has valid env values', () => {
  expect(Cypress.env())
    .to.be.an('object')
    .and.to.include.keys('url')
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


// describe('TournamentPage', () => {
//   beforeEach(() => {
//     cy.viewport('iphone-x');
//     cy.openPage('tournaments');
//   })

//   // it('Check page', () => {
//   // })

// })

describe('AccountPage - Not logged', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.openPage('account');
  })

  it('Login', () => {
    cy.loginEmail(false);
    cy.get('#title-sub').contains('Tu cuenta')
  })
})

describe('AccountPage - Logged', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
  })
  it('Save myData', () => {
    cy.loginEmail(true);
    cy.get('#option_myData').click();
    cy.contains('Mis datos');
    cy.get('#inputName');
    cy.get('#selectCountry');
    cy.get('#buttonSave').click()
  })

  it('Add car without photo', () => {
    cy.createCar();
  })

  it('Delete car', () => {
    cy.loginEmail(true);
    cy.get('#option_myGarage').click();
    cy.get('car-item').eq(1).click();
    cy.get('#delete').click();
    cy.get('.alert-button-role-ok').click();
  })
})



