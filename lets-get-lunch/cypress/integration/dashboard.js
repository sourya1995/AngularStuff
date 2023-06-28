describe('Dashboard', () => {
    before(() => {
      Cypress.config('baseUrl', 'http://0.0.0.0:8081');
    });
  
    beforeEach(() => {
      cy.request('DELETE', 'http://0.0.0.0:3000/api/test');
    });
  
    it('should redirect to the home page for an unauthorized user', () => {
      cy
        .visit('/dashboard')
        .url().should('include', '/');
    });
  
    it('should display a user\'s events in the dashboard calendar', () => {
      cy
        .signup()
        .createEvent('Dinner', 'Atlanta')
        .get('.cal-event .cal-event-title').should('have.text', 'Dinner');
    });
  
    it('should display a message if no events exist', () => {
      cy
        .signup()
        .get('.alert-info').should('be.visible');
    });
  });