describe('VAST CTA', function () {

    const visitTestPage = () => cy.visit('/vod_basic_cta_from_vast.html');

    afterEach(() => {
        cy.reload(true);
    });

    it('Should show CTA text from VAST XML', () => {
        visitTestPage();
        cy.playVideo();

        cy.contains('CTA Text Desktop');
    });

    it('Should show mobile CTA if Desktop is not set', () => {
        cy.interceptVast('vast_cta', 'vast_xml_mobile_cta_only');
        visitTestPage();
        cy.playVideo();

        cy.contains('CTA Text Mobile');
    });

    it('Should show CTA text from vastOptions if TitleCTA is missing tracking', () => {
        cy.interceptVast('vast_cta', 'vast_xml_invalid_title_cta');
        visitTestPage();
        cy.playVideo();

        cy.contains('CTA Text from fluid player vast options!');
    });
});
