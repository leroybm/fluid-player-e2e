/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Clicks on the play video element to start the video
     * @example
     * cy.playVideo()
     */
    playVideo(): Chainable<any>

    /**
     * Replaces a vast file returned by a GET request to a fixture file
     *
     * @example
     * cy.interceptVast('vast_cta', 'vast_cta_invalid_state');
     *
     * @param vastFile The VAST file that will be loaded in the Fluid Player test page
     * @param fixtureFile The VAST file that will replace the original vast file
     */
    interceptVast(vastFile: string, fixtureFile: string): Chainable<any>

    /**
     * Runs the fluidPlayer builder function by calling it in the `window` global, this only works if fluidPlayer is
     * loaded on the page
     *
     * @example
     * cy.loadFluidPlayer({ vastOptions: { adList: [{ roll: 'preRoll', vastTag: 'http://example.com/ad.php' }] } })
     *
     * @param configuration
     * @param target
     */
    loadFluidPlayer(configuration?: Partial<FluidPlayerOptions>, target?: HTMLVideoElement | String | string): Chainable<FluidPlayerInstance>
  }
}
