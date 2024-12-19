import BasePage from './BasePage';
import { URLS } from '../constants';

class AmazonPage extends BasePage {
    constructor() {
        super();
        this.url = URLS.AMAZON;
    }

    // Selectors as private properties
    #selectors = {
        searchInput: '#twotabsearchtextbox',
        acceptCookiesBtn: '#sp-cc-accept',
        searchResults: '.s-result-item',
        firstSearchResult: '.s-result-item:not(.AdHolder) h2 .a-link-normal',
        productTitle: '#productTitle',
        searchResultTitles: '.s-result-item h2 .a-text-normal'
    }

    // Elements getter methods
    elements = {
        searchInput: () => cy.get(this.#selectors.searchInput),
        acceptCookiesBtn: () => cy.get(this.#selectors.acceptCookiesBtn),
        searchResults: () => cy.get(this.#selectors.searchResults),
        firstSearchResult: () => cy.get(this.#selectors.firstSearchResult).first(),
        productTitle: () => cy.get(this.#selectors.productTitle),
        searchResultTitles: () => cy.get(this.#selectors.searchResultTitles)
    }

    // Actions
    acceptCookies() {
        cy.get('body').then($body => {
            if ($body.find(this.#selectors.acceptCookiesBtn).length > 0) {
                this.clickElement(this.elements.acceptCookiesBtn());
            }
        });
        return this;
    }

    searchProduct(productName) {
        this.typeText(this.elements.searchInput(), `${productName}{enter}`);
        return this;
    }

    verifySearchResults(expectedTitle) {
        this.elements.searchResults().should('have.length.gt', 0);
        if (expectedTitle) {
            this.elements.searchResultTitles()
                .first()
                .invoke('text')
                .should('include', expectedTitle);
        }
        return this;
    }

    clickFirstSearchResult() {
        this.clickElement(this.elements.firstSearchResult());
        return this;
    }

    verifyProductPage(expectedTitle) {
        this.elements.productTitle()
            .should('be.visible')
            .invoke('text')
            .should('include', expectedTitle);
        return this;
    }
}

export default new AmazonPage(); 