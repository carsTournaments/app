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

  it('Delete car', () => {
    cy.loginEmail(true);
    cy.get('#option_myGarage').click();
    cy.get('car-item').eq(1).click();
    cy.get('#delete').click();
    cy.get('.alert-button-role-ok').click();
  })
})



