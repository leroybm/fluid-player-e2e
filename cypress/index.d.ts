import fluidPlayer from 'fluid-player';

declare global {
  interface Window {
    fluidPlayer: typeof fluidPlayer;
  }
}

// Needs to be here for the window declaration to work
export {}
