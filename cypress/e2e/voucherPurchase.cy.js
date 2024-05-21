/// <reference types="cypress" />

describe('Voucher Purchase Flow', () => {

  const baseUrl = 'https://gift-cards.phorest.com/salons/demous';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should purchase a voucher for self', () => {
    cy.get('[type="radio"]').first().check();
    cy.contains('Send to me').click();
    cy.get('input[data-target="email.purchaserEmailInput"]').type('test1@team497460.testinator.com');
    cy.get('input[data-target="name.purchaserFirstNameInput"]').type('Test');
    cy.get('input[data-target="name.purchaserLastNameInput"]').type('User');
    cy.get('button[data-target="checkout.checkoutButton"]').should('be.visible');
    cy.get('button[data-target="checkout.checkoutButton"]').last().click();
    cy.get('button[data-action="confirm#confirmAction"]').click();
    cy.get('iframe[name^="__privateStripeFrame"]', { timeout: 10000 }).should('be.visible').then(($iframe) => {
      const $body = $iframe.contents().find('body');

      // Ensure the iframe body is fully loaded
      cy.wrap($body).find('input[name="cardnumber"]', { timeout: 10000 }).should('exist').then((cardNumberInput) => {
        cy.wrap(cardNumberInput).type('4111111111111111', { force: true });
      });

      cy.wrap($body).find('input[name="exp-date"]', { timeout: 10000 }).should('exist').then((expDateInput) => {
        cy.wrap(expDateInput).type('12/25', { force: true });
      });

      cy.wrap($body).find('input[name="cvc"]', { timeout: 10000 }).should('exist').then((cvcInput) => {
        cy.wrap(cvcInput).type('999', { force: true });
      });
    });


    cy.get('button[data-action="stripe-purchase#confirmPayment"]').click();
        
    // Verify confirmation page
    cy.contains('Payment accepted, thank you!').should('be.visible');


  });

  it('should purchase a voucher for someone else', () => {
    cy.get('[type="radio"]').first().check();
    cy.contains('Send to someone else').click();
    cy.get('input[data-target="email.purchaserEmailInput"]').type('test1@team497460.testinator.com');
    cy.get('input[data-target="name.purchaserFirstNameInput"]').type('Test');
    cy.get('input[data-target="name.purchaserLastNameInput"]').type('User');
    cy.get('input[data-target="email.recipientEmailInput"]').type('test2@team497460.testinator.com');
    cy.get('textarea[data-target="email.recipientMessageInput"]')
  .type('Happy Birthday! Wishing you a fantastic day filled with love and happiness. Enjoy your special gift!');
    cy.get('button[data-target="checkout.checkoutButton"]').should('be.visible');
    cy.get('button[data-target="checkout.checkoutButton"]').last().click();
    cy.get('button[data-action="confirm#confirmAction"]').click();
    cy.get('iframe[name^="__privateStripeFrame"]', { timeout: 10000 }).should('be.visible').then(($iframe) => {
      const $body = $iframe.contents().find('body');

      // Ensure the iframe body is fully loaded
      cy.wrap($body).find('input[name="cardnumber"]', { timeout: 10000 }).should('exist').then((cardNumberInput) => {
        cy.wrap(cardNumberInput).type('4111111111111111', { force: true });
      });

      cy.wrap($body).find('input[name="exp-date"]', { timeout: 10000 }).should('exist').then((expDateInput) => {
        cy.wrap(expDateInput).type('12/25', { force: true });
      });

      cy.wrap($body).find('input[name="cvc"]', { timeout: 10000 }).should('exist').then((cvcInput) => {
        cy.wrap(cvcInput).type('999', { force: true });
      });
    });


    cy.get('button[data-action="stripe-purchase#confirmPayment"]').click();
        
    // Verify confirmation page
    cy.contains('Payment accepted, thank you!').should('be.visible');


  });

  it('should display error for invalid credit card details', () => {
    cy.get('[type="radio"]').first().check();
    cy.contains('Send to me').click();
    cy.get('input[data-target="email.purchaserEmailInput"]').type('test1@team497460.testinator.com');
    cy.get('input[data-target="name.purchaserFirstNameInput"]').type('Test');
    cy.get('input[data-target="name.purchaserLastNameInput"]').type('User');
    cy.get('button[data-target="checkout.checkoutButton"]').should('be.visible');
    cy.get('button[data-target="checkout.checkoutButton"]').last().click();
    cy.get('button[data-action="confirm#confirmAction"]').click();
    cy.get('iframe[name^="__privateStripeFrame"]', { timeout: 10000 }).should('be.visible').then(($iframe) => {
      const $body = $iframe.contents().find('body');

      // Ensure the iframe body is fully loaded
      cy.wrap($body).find('input[name="cardnumber"]', { timeout: 10000 }).should('exist').then((cardNumberInput) => {
        cy.wrap(cardNumberInput).type('4111111111111122', { force: true });
      });
    });
        
     // Verify error message
     cy.get('[data-target="stripe-purchase.errorPanel"]', { timeout: 10000 })
  .should('exist')
  .and('contain', 'Your card number is invalid.', { force: true });
    


  });
  
  it('should display error for missing required fields', () => {
    cy.get('[type="radio"]').first().check();
    cy.contains('Send to me').click();
    cy.get('input[data-target="email.purchaserEmailInput"]').type('test1@.com');
    cy.get('[data-target="email.purchaserEmailError"]')
    .should('be.visible')
    .and('have.text', 'Please enter a valid email');
  });



  
});

