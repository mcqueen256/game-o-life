import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { connect } from 'react-redux';

import { initGrid, tick } from "../redux/actions";

const ALIVE = true;
const DEAD = false;

function createGrid(pixel_size, width, height) {
    const num_vertical_cells = Math.floor(0.8*height/(pixel_size+1));
    const num_horizontal_cells = Math.floor(0.8*width/(pixel_size+1));
    const cells = new Array(num_vertical_cells * num_horizontal_cells);
    cells.fill(DEAD);
    return {
        height: num_vertical_cells,
        width: num_horizontal_cells,
        cells
    };
}


const Grid = props => {
    console.group("Grid");
    const {
        initGrid,
        tick,
        width,
        height,
        cells,
    } = props;
    const targetRef = useRef();

    const pixel_size = 10;

    const getCell = (x, y) => {
        const index = width * y + x;
        return cells[index];
    };

    // const setCell = (x, y, val) => {
    //     const [ width, cells ] = grid;
    //     const index = width * y + x;
    //     let new_cells = Array(cells);
    //     new_cells[index] = val;
    //     setGrid({ ...grid, cells: new_cells });
    // };

    useLayoutEffect(() => {
        console.group("useLayoutEffect")
        if (targetRef.current) {
            if (targetRef.current.offsetWidth !== width || targetRef.current.offsetHeight !== height) {
                initGrid(pixel_size, targetRef.current.offsetWidth, targetRef.current.offsetHeight);
            }
        }
        console.groupEnd();
    }, []);

    useEffect(()=> {
        console.group("useEffect")
        console.log("Setting interval");
        const interval = setInterval(()=>{
            tick();
        }, 1000);
        console.groupEnd();
    }, []);

    console.log({width, height})


    console.groupEnd();
    return (<div className="Grid" ref={targetRef}>
        <table className="grid-table">
            <tbody>
                {(()=>{
                    let rows = [];
                    for(let y = height-1; y > 0; y--) {
                        let columns = [];
                        for(let x = 0; x < width; x++) {
                            const cell = (<td
                                key={'cell:' + x + '-' + y}
                                className="grid-cell"
                                width={pixel_size}
                                height={pixel_size}
                                style={
                                    getCell(x,y)?{backgroundColor:'#61dafb'}:{backgroundColor:'#282c34'}}
                            ></td>);
                            columns.push(cell);
                        }
                        rows.push(<tr key={'row: ' + y} className="grid-cell">{columns}</tr>);
                    }
                    return rows;
                })()}
            </tbody>
        </table>
    </div>);
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => ({
    initGrid: (pixel_size, pixel_width, pixel_height) => {
        dispatch(initGrid(pixel_size, pixel_width, pixel_height));
    },
    tick: () => dispatch(tick()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid);