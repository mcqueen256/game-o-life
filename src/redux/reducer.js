import * as actionTypes from './actionTypes';

const initState = {
    reset: false,
    speed: 0,
    cells: [],
    width: 0,
    height: 0,
    pixel_width: 0,
    pixel_height: 0,
}

const ALIVE = true;
const DEAD = false;


const reducer = (state = initState, action) => {
    console.group("REDUCER");
    console.log({action})
    switch (action.type) {
        case actionTypes.INIT_GRID: {
            const scale = 0.8;
            const px_h = action.payload.pixel_height;
            const px_w = action.payload.pixel_width;
            const px_size = action.payload.pixel_size;
            const num_vertical_cells = Math.floor(scale*px_h/(px_size+1));
            const num_horizontal_cells = Math.floor(scale*px_w/(px_size+1));
            const cells = new Array(num_vertical_cells * num_horizontal_cells);
            cells.fill(DEAD);
            console.groupEnd();
            return {
                ...state,
                pixel_width: action.payload.pixel_width,
                pixel_height: action.payload.pixel_height,
                height: num_vertical_cells,
                width: num_horizontal_cells,
                cells
            }
        }
        case actionTypes.RESET_RANDOM: {
            console.log(actionTypes.RESET_RANDOM);
            let cells = new Array(state.cells.length).fill(DEAD);
            for(let i = 0; i < state.cells.length; i++) {
                cells[i] = (Math.random()>0.5)?ALIVE:DEAD;
            }
            console.groupEnd();
            return {
                ...state,
                cells
            };
        }
        default:
            console.groupEnd();
            return state;
    }
}

export default reducer;