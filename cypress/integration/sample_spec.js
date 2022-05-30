describe('TitleCTA', function () {
    afterEach(() => {
        cy.reload(true);
    });

    it('Should show CTA text from VAST XML', () => {

        cy.visit('/vod_basic_cta_from_vast.html');
        cy.wait(1000);

        cy.document().then((doc) => {
            const script = doc.createElement('script')
            script.innerHTML = `
                var instance = fluidPlayer('fluid-player-e2e-case', {
                    vastOptions: {
                        adCTATextVast: true, // Enables getting CTA from the VAST tag
                        adCTAText: 'CTA Text from vast options!', // Note: Will only show if VAST tag doesn't have TitleCTA
                        adCTATextPosition: 'bottom left',
                        adList: [
                            {
                                roll: 'preRoll',
                                vastTag: '/static/vast_cta.xml', // VAST Tag with TitleCTA extension with CTA information
                            }
                        ]
                    }
                });
            `;
            doc.body.append(script);
        })


        cy.get('#fluid-player-e2e-case_fluid_state_button').click();
        cy.wait(1000);

        cy.contains('CTA Text Desktop');
    });

    xit('Should show CTA text from vastOptions if TitleCTA is missing tracking', () => {
        cy.visit('/vod_basic_cta_from_vast.html');

        cy.intercept('GET', '/static/vast_xml.xml', { fixture: 'vast_xml_invalid_title_cta.xml' });

        cy.get('#fluid-player-e2e-case_fluid_state_button').click();
        cy.wait(1000);

        cy.contains('CTA Text Desktop');
    });
});
