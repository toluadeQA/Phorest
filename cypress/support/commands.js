Cypress.Commands.add('iframeLoaded', { prevSubject: 'element' }, ($iframe) => {
    const contentWindow = $iframe.prop('contentWindow');
    return new Promise((resolve) => {
      if (contentWindow && contentWindow.document.readyState === 'complete') {
        resolve(contentWindow);
      } else {
        $iframe.on('load', () => {
          resolve(contentWindow);
        });
      }
    });
  });
  
  Cypress.Commands.add(
    'getInDocument',
    { prevSubject: 'document' },
    (document, selector) => Cypress.$(selector, document),
  );
  
  Cypress.Commands.add('getWithinIframe', (iframeSelector, targetElement) =>
    cy
      .get(iframeSelector, { timeout: 20000 }) // Wait longer for the iframe to appear
      .should('be.visible') // Ensure the iframe itself is visible
      .iframeLoaded()
      .its('document')
      .getInDocument(targetElement)
      .should('be.visible'), // Ensure the target element is visible
  );
  