import {INIT_GRID, RESET_RANDOM, TICK, PLAY, PAUSE } from './actionTypes'

export const initGrid = (pixel_size, pixel_width, pixel_height) => ({
    type: INIT_GRID,
    payload: {pixel_size, pixel_width, pixel_height}
});

export const resetRandom = () => ({
    type: RESET_RANDOM
});

export const tick = () => ({
    type: TICK
})

export const play = () => ({
    type: PLAY
});

export const pause = () => ({
    type: PAUSE
});