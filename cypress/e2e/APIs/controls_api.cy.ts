/**
 * This test file tests the Controls API as described in the public documentation.
 *
 * Note: Feature specific usage of Controls API should be located inside the feature file
 *
 * @see https://docs.fluidplayer.com/docs/api/controls/
 */
describe('CONTROLS API', () => {

  let instance: null | FluidPlayerInstance = null;

  beforeEach(() => {
    cy.visit('/blank_test_page.html');
  });

  afterEach(() => {
    instance = null;
  })

  it('should play and pause the video', () => {
    cy.loadFluidPlayer()
      .then(fpInstance => {
        instance = fpInstance;
        instance.play();

        cy.contains('00:01');
        cy.get('.fluid_control_playpause').should('have.class', 'fluid_button_pause');
      });

    cy.then(() => {
      instance.pause();
      cy.get('.fluid_control_playpause').should('have.class', 'fluid_button_play');
    })
  });

  it('should skip time', () => {
    cy.loadFluidPlayer()
      .then(fpInstance => {
        instance = fpInstance;
        instance.play();
      });

    cy.then(() => {
      instance.skipTo(20);
      cy.contains('00:20');
    })
  });

  it('should set playback speed', () => {
    cy.loadFluidPlayer({layoutControls: {playbackRateEnabled: true}})
      .then(fpInstance => {
        instance = fpInstance;
        instance.setPlaybackSpeed(2);
        instance.play();
        cy.get('video').then(video => {
          expect(video.get(0)).to.have.property('playbackRate', 2);
        });
      });

    cy.then(() => {
      instance.setPlaybackSpeed(1);
      cy.get('video').then(video => {
        expect(video.get(0)).to.have.property('playbackRate', 1);
      });
    })
  });

  it('should set volume', () => {
    cy.loadFluidPlayer()
      .then(fpInstance => {
        instance = fpInstance;
        instance.setVolume(0.5);
        instance.play();
        cy.get('video').then(video => {
          expect(video.get(0)).to.have.property('volume', 0.5);
        });
        cy.get('.fluid_button_mute.fluid_control_mute').should('not.exist');
      });

    cy.then(() => {
      instance.setVolume(0);
      cy.get('video').then(video => {
        expect(video.get(0)).to.have.property('volume', 0);
      });
      cy.get('.fluid_button_mute.fluid_control_mute').should('exist');
    });

    cy.then(() => {
      instance.setVolume(1);
      cy.get('video').then(video => {
        expect(video.get(0)).to.have.property('volume', 1);
      });
      cy.get('.fluid_button_mute.fluid_control_mute').should('not.exist');
    });

    cy.then(() => expect(() => instance.setVolume(Number.MAX_VALUE)).to.throw)
    cy.then(() => expect(() => instance.setVolume(Number.MIN_VALUE)).to.throw)
    cy.then(() => expect(() => instance.setVolume(NaN)).to.throw)
    // @ts-ignore This is an explicit error
    cy.then(() => expect(() => instance.setVolume('1')).to.throw)
  });
});
