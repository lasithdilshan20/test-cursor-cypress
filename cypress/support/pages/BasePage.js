export default class BasePage {
    constructor() {
        this.timeout = {
            short: Cypress.env('SHORT_TIMEOUT') || 5000,
            medium: Cypress.env('MEDIUM_TIMEOUT') || 10000,
            long: Cypress.env('LONG_TIMEOUT') || 30000
        };
    }

    // Common methods
    waitForElement(element, timeout = this.timeout.medium) {
        return element.should('exist').and('be.visible', { timeout });
    }

    clickElement(element) {
        this.waitForElement(element);
        element.click();
        return this;
    }

    typeText(element, text) {
        this.waitForElement(element);
        element.clear().type(text);
        return this;
    }

    getText(element) {
        this.waitForElement(element);
        return element.invoke('text');
    }

    isElementVisible(element) {
        return element.should('be.visible');
    }

    verifyUrl(url) {
        cy.url().should('include', url);
        return this;
    }
} 