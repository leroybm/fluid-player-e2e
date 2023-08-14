describe('CONFIG CTA', () => {

    beforeEach(() => {
        cy.visit('/blank_test_page.html');
    });

    afterEach(() => {
        cy.reload(true);
    });

    it('should show default cta', () => {
        cy.loadFluidPlayer({ vastOptions: { adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } });
        cy.playVideo();

        cy.contains('Visit now!');
    });

    it('should show cta from config', () => {
        cy.loadFluidPlayer({ vastOptions: { adCTAText: 'Test CTA', adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } });
        cy.playVideo();

        cy.contains('Test CTA');
    });

    it('should disable cta', () => {
        cy.loadFluidPlayer({ vastOptions: { adCTAText: false, adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } })
        cy.playVideo();

        cy.contains('Skip ad'); // Checks if ad is playing for below assertion
        cy.get('#fluid-player-e2e-case_fluid_cta').should('not.exist');
    });

    it('should show on top left', () => {
        cy.loadFluidPlayer({ vastOptions: { adCTATextPosition: 'top left', adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } })
        cy.playVideo();

        cy.get('#fluid-player-e2e-case_fluid_cta').should('have.css', 'left', '34px');
        cy.get('#fluid-player-e2e-case_fluid_cta').should('have.css', 'top', '34px');
    });
});
