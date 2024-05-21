# Cypress End-to-End Testing for Voucher Purchasing Flow

This project demonstrates how to use Cypress to automate the end-to-end testing of the voucher purchasing flow on a demo salon website. The tests cover the main purchase flow, including interactions with an embedded Stripe iframe for payment processing.

## Project Structure

- `cypress/`
  - `integration/`
    - `voucherPurchase.spec.js` - Test script for the voucher purchasing flow.
  - `support/`
    - `commands.js` - Custom Cypress commands to handle iframe interactions.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v12 or later)
- [Cypress](https://www.cypress.io/) (installed via npm)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/voucher-purchase-tests.git
cd voucher-purchase-tests
```

2. Install the dependencies:

```bash
npm install
```


## Running the Tests

To run the tests, use the following command:

```bash
npx cypress open
```

This will open the Cypress Test Runner, where you can select and run the test spec (`voucherPurchase.spec.js`).

Alternatively, to run the tests in headless mode, use:

```bash
npx cypress run
```

## Approach

1. **Setup**: Install Cypress and create custom commands to handle iframe interactions.
2. **Test Script**: Write a test script to automate the voucher purchasing flow, including selecting the voucher amount, filling out user information, and interacting with the Stripe payment iframe.
3. **Assertions**: Ensure that each step completes successfully and that the confirmation page is displayed at the end.
4. **Execution**: Run the tests using the Cypress Test Runner or in headless mode.

## Conclusion

This setup provides a robust framework for automating end-to-end tests of the voucher purchasing flow, including handling complex scenarios such as iframe interactions. By using Cypress's powerful features and custom commands, we ensure reliable and maintainable tests.
