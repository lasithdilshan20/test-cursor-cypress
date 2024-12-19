import GooglePage from '../support/pages/GooglePage';

describe('Amazon Search Flow', () => {
    let testData;

    before(() => {
        cy.fixture('search-data').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('should search for sporting goods on Amazon through Google', () => {
        cy.logStep('Navigate to Google');
        GooglePage
            .visit()
            .acceptCookies();

        cy.logStep('Search for Amazon');
        GooglePage
            .searchFor('amazon')
            .clickAmazonLink();

        testData.sportingGoods.forEach((product) => {
            cy.logStep(`Search for ${product.name} on Amazon`);
            cy.handleAmazonSearch(product);
        });
    });

    testData?.devices.forEach((device) => {
        it(`should search for ${device.name} and verify product details`, () => {
            cy.logStep('Navigate to Google');
            GooglePage
                .visit()
                .acceptCookies();

            cy.logStep('Search for Amazon');
            GooglePage
                .searchFor('amazon')
                .clickAmazonLink();

            cy.logStep(`Search for ${device.name} on Amazon and verify details`);
            cy.handleAmazonSearch(device, true);
        });
    });

    afterEach(() => {
        // Clean up or verification steps
    });
}); 