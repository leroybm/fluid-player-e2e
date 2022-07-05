describe('VAST CTA', function () {

    afterEach(() => {
        cy.reload(true);
    });

    it('Should show CTA text from VAST XML', () => {
        cy.visit('/vod_basic_cta_from_vast.html');

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();

        cy.contains('CTA Text Desktop');
    });

    it('Should show mobile CTA if Desktop is not set', () => {
        cy.intercept('GET', '/static/vast_cta.xml', { fixture: 'vast_xml_mobile_cta_only.xml' });

        cy.visit('/vod_basic_cta_from_vast.html');

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();

        cy.contains('CTA Text Mobile');
    });

    it('Should show CTA text from vastOptions if TitleCTA is missing tracking', () => {
        cy.intercept('GET', '/static/vast_cta.xml', { fixture: 'vast_xml_invalid_title_cta.xml' });

        cy.visit('/vod_basic_cta_from_vast.html');

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();

        cy.contains('CTA Text from fluid player vast options!');
    });
});
