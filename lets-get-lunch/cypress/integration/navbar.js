describe ('Navbar', () =>{
    before(() =>{
        Cypress.config('baseUrl', 'http://0.0.0.0:8081');
    });

    beforeEach(() =>{
        cy.visit('/');
    });

    describe('a user who isn\'t logged in', () =>{
        it('should show a link to signup', () => {
            cy.get('[data-test=signup]').click().url().should('include', '/signup');
        });

        it('should show a link to login', () => {
            cy.get('[data-test=login]').click().url().should('include', '/login')
        });

        it('should redirect to the base url when the navbar brand is clicked', () => {
            cy.get('.navbar-brand').click().url().should('include', '/');
        });
    });

    decribe('a user who is logged in', () =>{
        beforeEach(() =>{
            cy.request('DELETE', 'http://0.0.0.0:3000/api/test');
            cy.signup();
        });

        it('should show a link to logout', () => {
            cy.get('[data-test=logout]').should('have.text', 'Logout').click().url().should('include', '/');
        });

        it('should redirect to the dashboard when the navbar brand is clicked', () => {
            cy.get('.navbar-brand').click().url().should('include', '/dashboard');
        });

       
    });
})