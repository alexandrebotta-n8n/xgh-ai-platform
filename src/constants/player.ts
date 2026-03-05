// Web Audio API
export const FFT_SIZE = 128;
export const FFT_SMOOTHING = 0.8;
export const FREQUENCY_BINS = FFT_SIZE / 2;

// Spectrum gradient colors (neon green -> neon purple)
export const SPECTRUM_COLOR_START = { r: 57, g: 255, b: 20 };   // #39ff14
export const SPECTRUM_COLOR_END = { r: 168, g: 56, b: 255 };    // #a838ff
export const SPECTRUM_ALPHA_MIN = 0.6;
export const SPECTRUM_REFLECTION_OPACITY = 0.15;
export const SPECTRUM_BAR_GAP = 1;

// Player defaults
export const DEFAULT_VOLUME = 0.5;
export const TIME_WARNING_THRESHOLD = 10; // seconds remaining to show warning
