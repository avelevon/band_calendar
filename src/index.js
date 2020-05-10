import React, {useRef, useEffect, useCallback, useState} from 'react';
import ReactDom from 'react-dom';

import Calendar from "./Calendar";

const App = () => {

    const [homeNode, setHomeNode] = useState()
    const [range, setRange] = useState([10, 10])
    const [scrollToToday, setScrollToToday] = useState(true)

    const increaseRange = () => {
        setRange(prevState => ([prevState[0] + 10, prevState[1] + 10]))
    }

    const homeRef = useCallback(node => {
        node && !homeNode ? setHomeNode(node) : null
    }, [])

    const scrollToTodayHandler = () => {
        setScrollToToday(false)
    }

    useEffect(() => {
        setScrollToToday(true)
    }, [scrollToToday])

    const getTableFill = () => {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(i)
        }
    }

    // console.log('render', homeNode)
    return (
        <div className="layout">
            <table ref={homeRef}>
                <thead className="Calendar">
                {homeNode && <Calendar
                    homeNode={homeNode}
                    range={range}
                    scrollToToday={scrollToToday}
                />}
                </thead>
                <tbody>
                    {Array(10).map(itme => <tr>
                        
                    </tr>)}
                </tbody>
            </table>
            <button onClick={increaseRange}>Load More Dates</button>
            <button onClick={scrollToTodayHandler}>Scroll To Today</button>
        </div>
    );
};

ReactDom.render(
    <App/>,
    document.getElementById('wrapper')
);