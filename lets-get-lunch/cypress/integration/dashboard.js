describe('Dashboard', () => {
    before(() => {
        Cypress.config('baseUrl', 'http://0.0.0.0:8081');
    })

    it('should redirect to the home page for an unauthorized user', () => {
        cy.visit('/dashboard')
        .url().should('include', '/');
    });
})