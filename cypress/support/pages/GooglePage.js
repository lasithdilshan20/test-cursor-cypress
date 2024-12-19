import BasePage from './BasePage';
import { URLS } from '../constants';

class GooglePage extends BasePage {
    constructor() {
        super();
        this.url = URLS.GOOGLE;
    }

    // Selectors as private properties
    #selectors = {
        searchInput: 'input[name="q"]',
        acceptCookiesBtn: '[aria-label="Accept all"]'
    }

    // Elements getter methods
    elements = {
        searchInput: () => cy.get(this.#selectors.searchInput),
        acceptCookiesBtn: () => cy.get(this.#selectors.acceptCookiesBtn)
    }

    // Actions
    visit() {
        cy.visit(this.url);
        return this;
    }

    acceptCookies() {
        cy.get('body').then($body => {
            if ($body.find(this.#selectors.acceptCookiesBtn).length > 0) {
                this.clickElement(this.elements.acceptCookiesBtn());
            }
        });
        return this;
    }

    searchFor(text) {
        this.typeText(this.elements.searchInput(), `${text}{enter}`);
        return this;
    }

    clickAmazonLink() {
        cy.contains('amazon', { timeout: this.timeout.medium }).click();
        return this;
    }
}

export default new GooglePage(); 