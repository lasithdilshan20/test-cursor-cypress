import { MESSAGES } from './constants';

Cypress.Commands.add('handleAmazonSearch', (searchData, clickFirst = false) => {
    cy.origin('https://www.amazon.com', { args: { searchData, clickFirst } }, ({ searchData, clickFirst }) => {
        const AmazonPage = require('../support/pages/AmazonPage').default;
        
        const searchFlow = AmazonPage
            .acceptCookies()
            .searchProduct(searchData.name)
            .verifySearchResults(searchData.expectedTitle);

        if (clickFirst) {
            searchFlow
                .clickFirstSearchResult()
                .verifyProductPage(searchData.expectedTitle);
        }

        cy.log(MESSAGES.SUCCESS.SEARCH_COMPLETED);
    }).catch((error) => {
        cy.log(`Search failed: ${error.message}`);
        throw error;
    });
});

Cypress.Commands.add('logStep', (stepName) => {
    cy.log(`Step: ${stepName}`);
}); 