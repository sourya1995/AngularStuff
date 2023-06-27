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

    describe('Signup', () => {
        before(() => {
            Cypress.config('baseUrl', 'http://0.0.0.0:8081');
        });
    
        beforeEach(() => {
            cy.request('DELETE', 'http://0.0.0.0:3000/api/test');
        });
        it('should navigate to the dashboard with valid credentials', () => {
            cy
                .visit('/signup')
                .url().should('include', '/signup')
                .get('#username').type('user')
                .get('#password').type('password')
                .get('form').submit()
                .url().should('include', '/dashboard');
        });
        it('should navigate to the dashboard with valid credentials ' +
            'and diet preferences', () => {
                cy
                    .visit('/signup')
                    .url().should('include', '/signup')
                    .get('#username').type('user')
                    .get('#password').type('password')
                    .get('#BBQ').click()
                    .get('form').submit()
                    .url().should('include', '/dashboard');
            });
        it('should display an error with invalid credentials', () => {
            cy
                .visit('/signup')
                .url().should('include', '/signup')
                .get('#username').type('user')
                .get('#password').type('123')
                .get('form').submit()
                .get('.alert')
                .should('be.visible')
                .should('have.text', 'Your password must be at least 5 characters long.');
        });
        // TODO
        it('should display an error for a username that already exists', () => {
            cy
                .visit('/signup')
                .url().should('include', '/signup')
                .get('#username').type('user')
                .get('#password').type('password')
                .get('form').submit()
                .url().should('include', '/dashboard');
    
            cy
                .get('[data-test=logout]').click();
    
            cy
                .visit('/signup')
                .url().should('include', '/signup')
                .get('#username').type('user')
                .get('#password').type('password')
                .get('form').submit()
                .get('.alert')
                .should('be.visible')
                .should('have.text', 'This user already exists.');
        });
    
    });
});

