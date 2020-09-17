import * as actionTypes from './actionTypes';

const initState = {
    reset: false,
    speed: 'pause',
    cells: [],
    gen: {},
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
            let gen = {};
            for (let x = 0; x < num_horizontal_cells; x++) {
                gen[x] = {}
                for (let y = 0; y < num_vertical_cells; y++) {
                    gen[x][y] = DEAD;
                }
            }
            const cells = new Array(num_vertical_cells * num_horizontal_cells);
            cells.fill(DEAD);
            console.groupEnd();
            return {
                ...state,
                pixel_width: action.payload.pixel_width,
                pixel_height: action.payload.pixel_height,
                height: num_vertical_cells,
                width: num_horizontal_cells,
                cells,
                gen
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
        case actionTypes.PLAY: {
            console.log(actionTypes.PLAY);
            console.groupEnd();
            return { ...state, speed: 'play' };
        }
        case actionTypes.PAUSE: {
            console.log(actionTypes.PAUSE);
            console.groupEnd();
            return { ...state, speed: 'pause' };
        }
        case actionTypes.TICK: {
            console.log(actionTypes.TICK);

            let next_gen = {};
            for (let x = 0; x < state.width; x++) {
                for (let y = 0; y < state.height; y++) {
                    //count living neighbors
                    let living_neighbors = 0;
                    for (let dx = 0; dx < 3; dx++) {
                        for (let dy = 0; dy < 3; dy++) {
                            if (dx === 1 && dy === 1) continue;
                            const nx = (x + dx) % state.width;
                            const ny = (y + dy) % state.height;
                            if (state.gen[nx][ny] === ALIVE) living_neighbors++;
                        }
                    }
                    // calculate next gen status
                    if (state.gen[x][y] === ALIVE) {
                        if (living_neighbors === 2 || living_neighbors === 3) {
                            next_gen[x][y] = ALIVE;
                        }
                        else {
                            next_gen[x][y] = DEAD;
                        }
                    }
                }
            }


            let cells = new Array(state.cells.length).fill(DEAD);
            for(let i = 0; i < state.cells.length; i++) {
                //count the neighbors
                let living_neighbors = 0;
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < 3; y++) {
                        if (x === 1 && y === 1) continue;
                        const dy = Math.floor(i/state.width)
                        const index = state.width * ((dy+y)%state.height) + ((i+x)%state.width);
                        if (state.cells[index] === ALIVE) {
                            living_neighbors++;
                        }
                    }
                }

                const cell = state.cells[i];
                if (cell === ALIVE) {
                    if (living_neighbors === 2 || living_neighbors === 3) {
                        cells[i] = ALIVE;
                    }
                    else {
                        cells[i] = DEAD;
                    }
                } else {
                    if (living_neighbors === 3) {
                        cells[i] = ALIVE;
                    }
                }

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