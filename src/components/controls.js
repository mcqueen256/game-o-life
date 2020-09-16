import React from 'react';
import { connect } from 'react-redux';
import { resetRandom } from "../redux/actions";

const Hr = props => (<dir className="Hr"></dir>);

const Controls = props => {
    const {
        resetRandom,
    } = props;

    return (
        <div className="Controls">
            <p>Game O Life</p>
            <button onClick={resetRandom}>reset</button>
            <button >inc</button>
            <button >dev</button>
            <Hr />
        </div>
    )
};

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => ({
    resetRandom: () => {
        dispatch(resetRandom());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);