describe('CONFIG CTA', () => {

    const getScript = (document, config) => {
        const script = document.createElement('script');
        script.innerHTML = `var instance = fluidPlayer('fluid-player-e2e-case', ${config});`;
        return script;
    };

    afterEach(() => {
        cy.reload(true);
    });

    it('should show default cta', () => {
        cy.visit('/blank_test_page.html');

        cy.document().then(document => {
            const script = getScript(document, `{ vastOptions: { adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } }`);

            document.body.append(script);
        });

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();

        cy.contains('Visit now!');
    });

    it('should show cta from config', () => {
        cy.visit('/blank_test_page.html');

        cy.document().then(document => {
            const script = getScript(document, `{ vastOptions: { adCTAText: 'Test CTA', adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } }`);

            document.body.append(script);
        });

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();

        cy.contains('Test CTA');
    });

    it('should disable cta', () => {
        cy.visit('/blank_test_page.html');

        cy.document().then(document => {
            const script = getScript(document, `{ vastOptions: { adCTAText: false, adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } }`);

            document.body.append(script);
        });

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();

        cy.contains('Skip ad'); // Checks if ad is playing for below assertion
        cy.get('#fluid-player-e2e-case_fluid_cta').should('not.exist');
    });

    it('should show on top left', () => {
        cy.visit('/blank_test_page.html');

        cy.document().then(document => {
            const script = getScript(document, `{ vastOptions: { adCTATextPosition: 'top left', adList: [ { roll: 'preRoll', vastTag: '/static/vast_cta.xml' } ] } }`);

            document.body.append(script);
        });

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();

        cy.get('#fluid-player-e2e-case_fluid_cta').should('have.css', 'left', '34px');
        cy.get('#fluid-player-e2e-case_fluid_cta').should('have.css', 'top', '34px');
    });
});
