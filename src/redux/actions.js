import {INIT_GRID, RESET_RANDOM, TICK_GRID, INC, DEC } from './actionTypes'

export const initGrid = (pixel_size, pixel_width, pixel_height) => ({
    type: INIT_GRID,
    payload: {pixel_size, pixel_width, pixel_height}
});

export const resetRandom = () => ({
    type: RESET_RANDOM
});

export const tickGrid = () => ({
    type: TICK_GRID
});

export const inc = () => ({
    type: INC
});

export const dec = () => ({
    type: DEC
});