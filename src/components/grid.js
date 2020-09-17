import React, { useRef, useLayoutEffect } from "react";
import { connect } from 'react-redux';

import { initGrid } from "../redux/actions";

const ALIVE = true;
// const DEAD = false;

const createCell = (x, y, pixel_size) => {
    const Cell = ({status, width}) => (
        <td
            key={width*y+x}
            className="grid-cell"
            width={pixel_size}
            height={pixel_size}
            style={
                (status === ALIVE) ? {
                    backgroundColor:'#61dafb'
                } : {
                    backgroundColor:'#282c34'
                }}
        ></td>
    )

    const mapStateToProps = state => {
        return {
            status: state.gen[x][y],
            width: state.width
        };
    }
    
    const mapDispatchToProps = dispatch => ({
    });
    return connect(mapStateToProps, mapDispatchToProps)(Cell);
}


const Grid = props => {
    console.group("Grid");
    const {
        initGrid,
        width,
        height,
        cells,
    } = props;
    const targetRef = useRef();

    const pixel_size = 10;

    useLayoutEffect(() => {
        console.group("useLayoutEffect")
        if (targetRef.current) {
            if (targetRef.current.offsetWidth !== width || targetRef.current.offsetHeight !== height) {
                initGrid(pixel_size, targetRef.current.offsetWidth, targetRef.current.offsetHeight);
            }
        }
        console.groupEnd();
    }, []);

    console.groupEnd();
    return (<div className="Grid" ref={targetRef}>
        <table className="grid-table">
            <tbody>
                {(()=>{
                    let rows = [];
                    for(let y = height-1; y > 0; y--) {
                        let columns = [];
                        for(let x = 0; x < width; x++) {
                            const Cell = createCell(x, y, pixel_size);
                            columns.push(<Cell key={width*y+x}/>);
                        }
                        rows.push(<tr key={width * height + y} className="grid-cell">{columns}</tr>);
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid);