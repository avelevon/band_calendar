import React, {useRef, useCallback, useState} from 'react';
import ReactDom from 'react-dom';

import Calendar from "./Calendar";

const App = () => {

    const [homeNode, setHomeNode] = useState()
    const [range, setRange] = useState([10, 10])

    const increaseRange = () => {
        setRange(prevState => ([prevState[0] + 10, prevState[1] + 10]))
    }

    const homeRef = useCallback(node => {
        node && !homeNode ? setHomeNode(node) : null
    }, [])

    // console.log('render', homeNode)
    return (
        <div className="layout">
            <table ref={homeRef}>
                <thead className="Calendar">
                {homeNode && <Calendar
                    homeNode={homeNode}
                    range={range}
                />}
                </thead>
            </table>
            <button onClick={increaseRange}>Forward</button>
        </div>
    );
};

ReactDom.render(
    <App/>,
    document.getElementById('wrapper')
);