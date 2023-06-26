describe('Signup', () => {
    before( () => {
        Cypress.config('baseUrl', 'http://0.0.0.0:8081');
    });

    beforeEach( () => {
        cy.request('DELETE', 'http://0.0.0.0:3000/api/test');
    });

    it('should navigate to the dashboard with valid credentials', () => {
        cy
        .visit('/signup')
        .url().should('include', '/signup')
        .get('#username').type('user')
        .get('#password').type('password')
        .get('#BBQ').click()
        .get('form').submit()
        .url().should('include', '/dashboard');
    });

    it('should navigate to the dashboard with valid credentials' + 'and diet preferences', () => {
        cy
        .visit('/signup')
        .url().should('include', '/signup')
        .get('#username').type('user')
        .get('#password').type('password')
        .get('#BBQ').click()
        .get('form').submit().wait(1000)
        .url().should('include', '/dashboard');
    });

    it('should display an error with invalid credentials', () => {
        cy
        .visit('/signup')
        .url().should('include', '/signup')
        .get('#username').type('user')
        .get('#password').type('password')
        .get('form').submit().wait(1000)
        .get('.alert')
        .should('be.visible')
        .should('have.text', 'your password must be atleast 5 characters long');
    });

    it('should navigate to the dashboard with valid credentials' + 'and diet preferences', () => {
        cy
        .visit('/signup')
        .url().should('include', '/signup')
        .get('#username').type('user')
        .get('#password').type('password')
        .get('#BBQ').click()
        .get('form').submit().wait(1000)
        .url().should('include', '/dashboard');
    });
});

