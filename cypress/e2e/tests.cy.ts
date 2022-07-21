describe('HomePage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
  })

  it('Check page', () => {
    cy.visit('http://localhost:8100')
    cy.contains('Torneos de coches ficticios');
    cy.contains('Entrar');
  })
})

describe('TournamentsPage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
  })

  it('Check page', () => {
    cy.visit('http://localhost:8100/tab/tournaments')
    cy.contains('Torneos');
    cy.contains('Ranking');
  })

  it('Click tournament', () => {
    cy.visit('http://localhost:8100/tab/tournaments')
    cy.get('tournament-item').eq(1).click();
  })

  it('Click ranking', () => {
    cy.visit('http://localhost:8100/tab/tournaments')
    cy.get('.option-item').click();
  })
})


describe('TournamentPage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
  })

  it('Check page', () => {
    cy.openTournament();
  })

})
